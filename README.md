# 🦸‍♂️ Marvel Heroes Hangman (React)

A fun **Hangman-style word guessing game** built with **React**, themed around **Marvel heroes**. Guess the correct word before all heroes are defeated! The game includes visual feedback, animations, and a celebratory confetti effect when you win 🎉

---

## 🚀 Features

- ⚛️ Built with **React Hooks** (`useState`, `useEffect`, `useRef`)
- 🧩 Randomly generated puzzle words
- 🦸 Hero-based life system instead of classic hangman
- 🎨 Dynamic styling with `clsx`
- 🎉 Confetti animation on win
- ⌨️ Interactive on-screen keyboard
- 🔁 Restart game with **Fight Again** button
- 📱 Responsive layout with automatic scrolling

---

## 🕹️ How to Play

1. A random word is selected at the start of the game.
2. Click letters on the on-screen keyboard to guess.
3. Correct guesses reveal letters in the puzzle.
4. Incorrect guesses eliminate heroes one by one.
5. You **win** if you reveal the entire word.
6. You **lose** if all heroes are defeated.
7. Click **Fight Again** to start a new game.

---

## 📦 Dependencies

This project uses the following packages:

- `react`
- `nanoid` – unique keys
- `clsx` – conditional class names
- `react-use` – window size hook
- `react-confetti` – win animation
