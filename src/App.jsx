import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import clsx from "clsx";
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

import "./App.css";

import Header from "../components/Header";
import Status from "../components/Status";
import HeroesChips from "../components/HeroesChips";

import Heroes from "./heroes";
import Words from "./marvel"

function App() {
  let [puzzleWord, setPuzzleWord] = useState(()=>getPuzzleWord());
  let [guessLetters, setGuessLetters] = useState([]);
  const { width, height } = useWindowSize()
  const statusElemRef = useRef(null);
  const newGameBtn = useRef(null);


  let wrongGuess = guessLetters.filter((letter) => !puzzleWord.includes(letter));
  const isGameLost = wrongGuess.length >= Heroes.length - 1;
  const isGameWon = !isGameLost && puzzleWord.split("").every((letter) => guessLetters.includes(letter));
  const isGameOver = isGameLost || isGameWon;

  let heroesElms = Heroes.map((hero, index) => {
    let heroStyle = { color: hero.color, backgroundColor: hero.background };
    return (
      <div
        className={clsx("hero-pill", { lost: wrongGuess.length > index })}
        key={hero.name}
        style={heroStyle}
        onMouseOver={() => {
          (event.target.style.color = hero.background),
            (event.target.style.backgroundColor = hero.color);
        }}
        onMouseOut={() => {
          (event.target.style.color = hero.color),
            (event.target.style.backgroundColor = hero.background);
        }}
      >
        {hero.name}
      </div>
    );
  });

  function getPuzzleWord() {
    let randomIndex = Math.floor(Math.random() * Words.length);
    return Words[randomIndex].toLowerCase();
  }

  function CreatePuzzle() {
    return puzzleWord.split("").map((letter, index) => {
      let letterStyles = clsx('puzzle-letter', { "game-over": !guessLetters.includes(letter)});
      console.log(puzzleWord)
      return (
        <span key={`${letter}-${index}`} className={letterStyles}>
          {isGameOver ? letter : puzzleWord.includes(letter) && guessLetters.includes(letter) ? letter : null}
        </span>
      );
    });
  }

  function CreateKeyboard() {
    function guessLetter(letter) {
      if (isGameOver) return;
      setGuessLetters((oldLetters) => [...oldLetters, letter]);
    }
    function dynamicStyle(letter) {
      return clsx("letter-btn", {
        "correct-guess":
          guessLetters.includes(letter) && puzzleWord.includes(letter),
        "wrong-guess":
          guessLetters.includes(letter) && !puzzleWord.includes(letter),
      });
    }

    return Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(97 + i)
    ).map((letter) => {
      return (
        <button
          key={nanoid()}
          className={dynamicStyle(letter)}
          onClick={() => guessLetter(letter)}
        >
          {" "}
          {letter}
        </button>
      );
    });
  }

  function fightAgain() {
    setPuzzleWord(getPuzzleWord())
    setGuessLetters([])
  }

  useEffect(()=> {
    if (wrongGuess.length > 0) statusElemRef.current.scrollIntoView({behavior: 'smooth'})
    if (isGameOver) setTimeout(()=> newGameBtn.current.scrollIntoView({behavior:"smooth"}), 1000);
    
  }, [wrongGuess])
  
  return (
    <>
      <Header />
      {isGameWon ? <Confetti
      width={width}
      height={height}
    /> : null}
      <main>
        <Status
          ref={statusElemRef}
          wrongArr={wrongGuess}
          heroesArr={Heroes}
          gameStatus={isGameOver}
          won={isGameWon}
          lost={isGameLost}
        />
        <HeroesChips elems={heroesElms} />
        <section className="puzzle-wrap">
          <CreatePuzzle />
        </section>
        <section className="keyboard-wrap">
          <CreateKeyboard />
        </section>
        <button className="newGame" onClick={fightAgain} ref={newGameBtn}> Fight Again</button>
      </main>
    </>
  );
}

export default App;
