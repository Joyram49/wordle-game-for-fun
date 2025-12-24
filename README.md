Wordle Game 🎮 A fully functional Wordle clone built with React and Tailwind
CSS. Guess the 5-letter word in 6 attempts with color-coded feedback (🟩🟨⬜).

✨ Features

✅ 6 attempts to guess the 5-letter word

🎨 Color feedback: Green (correct position), Yellow (wrong position), Gray (not
in word)

⌨️ Keyboard navigation: Auto-focus next input, Backspace support

📱 Fully responsive design (mobile, tablet, desktop)

🔄 Try Again button generates new random word

🛡️ Input validation: Only letters allowed

🎉 Win/lose states with celebratory messages

🛠 Tech Stack React 18 with TypeScript

Tailwind CSS for styling

Faker.js for random word generation

Next.js 14 (App Router)

🚀 Quick Start Prerequisites Node.js 18+

npm or yarn

Installation bash

# Clone the repo

git clone https://github.com/yourusername/wordle-game.git cd wordle-game

# Install dependencies

npm install

# Run development server

npm run dev Open http://localhost:3000 to play!

Build for Production bash npm run build npm start 🎮 How to Play Guess a
5-letter word and press Enter

Green 🟩 = Correct letter, correct position

Yellow 🟨 = Correct letter, wrong position

Gray ⬜ = Letter not in word

6 attempts max - Try Again for new word!

📁 Project Structure
wordle-game/
├── app/
│   └── page.tsx          # Main game component
├── components/
│   └── how-to-play.tsx   # Game instructions
├── public/               # Static assets
├── tailwind.config.ts    # Tailwind configuration
└── package.json

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'feat: add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📄 License This project is MIT licensed.

Made with ❤️ using React - Deployed on Vercel/Netlify ✨ Star this repo if you
found it useful!
