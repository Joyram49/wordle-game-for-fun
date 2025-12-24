"use client";
import React, { useEffect, useMemo, useState } from "react";
import HowToPlay from "./components/how-to-play";

type ResultType = "correct" | "present" | "absent" | "";
type MessageState = "success" | "failed" | "exceed" | "";

import { faker } from "@faker-js/faker";

// generate random word each time after game restart
const generateRandomWord = (): string => {
  return faker.word.sample(5);
};

export default function Home() {
  const [rows, setRows] = useState<
    { letters: string[]; result: ResultType[]; disabled: boolean }[]
  >([
    { letters: Array(5).fill(""), result: Array(5).fill(""), disabled: false },
  ]);
  const [resultState, setResultState] = useState<{
    message: string;
    state: MessageState;
  }>({
    message: "",
    state: "",
  });

  const [randomWord, setRandomWord] = useState(generateRandomWord());

  const maxAttempts = 6;

  // sanitize word and for valid input focus on next input
  const handleChange = (index: number, rowIndex: number, value: string) => {
    const onlyLettersRegex = /^[A-Za-z]+$/;
    if (!onlyLettersRegex.test(value)) {
      return;
    }
    if (value.length > 1) return;
    const newRows = [...rows];
    newRows[rowIndex].letters[index] = value;
    setRows(newRows);

    const nextInputRef = document.getElementById(
      `input-${rowIndex}-${index + 1}`
    );
    if (nextInputRef && value) {
      nextInputRef.focus();
    }
  };

  // compare guesses with random word
  const compareWords = (secret: string[], guess: string[]) => {
    // step 1: initially fill all empty field of result with 'absent'
    const result: ResultType[] = Array(secret.length).fill("absent");
    const secretCopy = [...secret];

    // step 2:  fill all empty field or already absent field of result with 'correct' if matched
    guess.forEach((char, idx) => {
      if (char.toLowerCase() === secretCopy[idx].toLowerCase()) {
        result[idx] = "correct";
        secretCopy[idx] = "";
      }
    });

    // step 3:  fill all empty field or already absent field of result with 'present' if doesn't match but includes in random words
    guess.forEach((char, idx) => {
      if (result[idx] === "correct") return;
      const foundIdx = secretCopy.indexOf(char.toLowerCase());
      if (foundIdx !== -1) {
        result[idx] = "present";
        secretCopy[foundIdx] = "";
      }
    });

    return result;
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    rowIndex: number
  ) => {
    const newRows = [...rows];

    if (e.key === "Enter") {
      const letters = newRows[rowIndex].letters;

      // if user left some field to fill
      if (letters.includes("")) {
        setResultState({
          message: "Please complete all input fields.",
          state: "exceed",
        });
        return;
      }

      // compare user input field with random word
      const res = compareWords(randomWord.split(""), letters);
      newRows[rowIndex].result = res;
      setRows(newRows);

      // check user put all value correctly
      const isCorrect = res.every((r) => r === "correct");

      // create new row if user doesn't put correct value and not exceed the length
      if (!isCorrect && rows.length < maxAttempts) {
        // set new rows and disable all the previous rows field
        const updatedRows = newRows.map((row, idx) =>
          idx <= index ? { ...row, disabled: true } : row
        );

        updatedRows.push({
          letters: Array(randomWord.length).fill(""),
          result: Array(randomWord.length).fill(""),
          disabled: false,
        });
        setRows(updatedRows);

        // focus on new rows
        setTimeout(() => {
          const nextRowInputRef = document.getElementById(
            `input-${rows.length}-0`
          ) as HTMLInputElement;
          if (nextRowInputRef) {
            nextRowInputRef.focus();
          }
        }, 0);
      }

      // max attempts reached but couldn't guess the words
      if (!isCorrect && rows.length === maxAttempts) {
        // disable all rows including last
        const disabledRows = newRows.map((row) => ({ ...row, disabled: true }));
        setRows(disabledRows);
        setResultState({
          message: `Sorry! You haven\'t guess the correct within your ${maxAttempts} attempts.`,
          state: "failed",
        });
      }

      // guessed correctly
      if (isCorrect) {
        const disabledRows = newRows.map((row) => ({ ...row, disabled: true }));
        setRows(disabledRows);
        setResultState({
          message: "Congratulations! You have successfully guessed the word.",
          state: "success",
        });
      }
    }
    if (e.key === "Backspace") {
      e.preventDefault();

      if (newRows[rowIndex].letters[index]) {
        const updatedRows = rows.map((row, rIdx) =>
          rIdx === rowIndex
            ? {
                ...row,
                letters: row.letters.map((letter, lIdx) =>
                  lIdx === index ? "" : letter
                ),
              }
            : row
        );
        setRows(updatedRows);
      } else if (index > 0) {
        const prevInputRef = document.getElementById(
          `input-${rowIndex}-${index - 1}`
        );
        if (prevInputRef) {
          prevInputRef.focus();
        }
      }
    }
  };

  const handleReset = () => {
    setRows([
      {
        letters: Array(5).fill(""),
        result: Array(5).fill(""),
        disabled: false,
      },
    ]);
    setResultState({ message: "", state: "" });
    setRandomWord(generateRandomWord());
  };
  console.log(randomWord);
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-16 lg:py-32 flex flex-col items-center gap-8 lg:gap-12">
        {/* Header  */}
        <h1 className="text-gray-900 text-center text-2xl sm:text-3xl lg:text-4xl font-semibold w-full mb-4 sm:mb-8 lg:mb-12 border-b border-gray-200 pb-4 sm:pb-6 max-w-2xl mx-auto">
          Wordle Game
        </h1>

        {/* Main Game Layout  */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start justify-center max-w-4xl">
          {/* Game Grid  */}
          <div className="w-full flex gap-2 sm:gap-3 justify-center items-start flex-col max-w-sm sm:max-w-md mx-auto">
            {rows.map((row, rowIndex) => (
              <div
                className="flex gap-2 sm:gap-3 w-full justify-center"
                key={rowIndex}
              >
                {row.letters.map((letter, index) => (
                  <input
                    key={index}
                    type="text"
                    id={`input-${rowIndex}-${index}`}
                    maxLength={1}
                    value={letter.toUpperCase()}
                    disabled={row.disabled}
                    onChange={(e) =>
                      handleChange(index, rowIndex, e.target.value)
                    }
                    onKeyDown={(e) => handleKeyDown(e, index, rowIndex)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 text-center border-2 text-xl sm:text-2xl font-bold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 uppercase flex items-center justify-center shadow-sm flex-1 sm:flex-none ${
                      row.result[index] === "correct"
                        ? "bg-green-500 text-white border-green-500 shadow-md hover:shadow-lg"
                        : row.result[index] === "present"
                          ? "bg-yellow-400 text-white border-yellow-400 shadow-md hover:shadow-lg"
                          : row.result[index] === "absent"
                            ? "bg-gray-400 text-white border-gray-400 shadow-sm"
                            : "border-gray-300 text-gray-800 bg-gray-50 hover:bg-white focus:border-gray-400 hover:shadow-sm hover:border-gray-400"
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* HowToPlay  */}
          <div className="w-full lg:w-auto max-w-md mx-auto lg:mx-0">
            <HowToPlay maxAttempts={maxAttempts} />
          </div>
        </div>

        {/* Status Message  */}
        <div className="mt-6 sm:mt-8 w-full flex flex-col items-center">
          <div
            className={`text-base sm:text-lg font-semibold px-4 sm:px-6 py-3 sm:py-4 rounded-lg border-2 text-center w-full max-w-md sm:max-w-lg transition-all duration-200 mx-auto shadow-sm ${
              resultState.state === "success"
                ? "bg-green-50 border-green-300 text-green-800 ring-2 ring-green-200/50"
                : resultState.state === "failed"
                  ? "bg-red-50 border-red-300 text-red-800 ring-2 ring-red-200/50"
                  : resultState.state === "exceed"
                    ? "bg-yellow-50 border-yellow-300 text-yellow-800 ring-2 ring-yellow-200/50"
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {resultState.message || (
              <span className="text-sm sm:text-base text-gray-500 font-normal">
                Type your 5-letter guess and press Enter →
              </span>
            )}
          </div>

          {(resultState?.state === "failed" ||
            resultState?.state === "success") && (
            <button
              onClick={handleReset}
              className="mt-4 sm:mt-6 h-11 sm:h-12 px-6 sm:px-8 border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto max-w-sm"
            >
              🔄 Try Again
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
