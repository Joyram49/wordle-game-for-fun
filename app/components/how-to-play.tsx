function HowToPlay({ maxAttempts }: { maxAttempts: number }) {
  return (
    <div className="w-full max-w-md rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Play</h2>

      <p className="text-gray-700 mb-4">
        Guess the <span className="font-semibold">5-letter word</span> in
        <span className="font-semibold"> {maxAttempts} tries</span>. Each guess
        must be a valid English word.
      </p>

      <ul className="space-y-3 text-gray-700 text-sm">
        <li className="flex items-center gap-3">
          <span className="w-4 h-4 rounded bg-green-500"></span>
          <span>
            <strong>Green</strong> — Letter is correct and in the right position
          </span>
        </li>

        <li className="flex items-center gap-3">
          <span className="w-4 h-4 rounded bg-yellow-400"></span>
          <span>
            <strong>Yellow</strong> — Letter is in the word but wrong position
          </span>
        </li>

        <li className="flex items-center gap-3">
          <span className="w-4 h-4 rounded bg-gray-400"></span>
          <span>
            <strong>Gray</strong> — Letter is not in the word
          </span>
        </li>
      </ul>

      <hr className="my-5 border-gray-300" />

      <h3 className="text-md font-semibold text-gray-900 mb-2">Controls</h3>

      <ul className="space-y-2 text-sm text-gray-700">
        <li>⌨️ Type letters (A–Z only)</li>
        <li>
          ↩️ Press <strong>Enter</strong> to submit a guess
        </li>
        <li>
          ⌫ Press <strong>Backspace</strong> to delete
        </li>
      </ul>

      <hr className="my-5 border-gray-300" />

      <p className="text-sm text-gray-600">
        💡 Tip: Letters can appear more than once in the word. Pay attention to
        the colors!
      </p>
    </div>
  );
}

export default HowToPlay;
