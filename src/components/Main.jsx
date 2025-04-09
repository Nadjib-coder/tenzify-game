import Die from './Die';
import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function Main() {
  const [dice, setDice] = useState(() => generateNewDice());
  const buttonRef = useRef(null);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function generateNewDice() {
    return new Array(10).fill(0).map(() => ({
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
  }

  function rollDice() {
    if (!gameWon) {
      setDice((prev) =>
        prev.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) },
        ),
      );
    } else {
      setDice(generateNewDice());
    }
  }

  function hold(id) {
    setDice((prev) =>
      prev.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die,
      ),
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => hold(die.id)}
    />
  ));

  return (
    <main>
      {gameWon && <Confetti />}
      <div className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <div className="dice-container">{diceElements}</div>
      <button ref={buttonRef} onClick={rollDice} className="roll-dice">
        {gameWon ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}
