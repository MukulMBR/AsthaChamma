import React, { createContext, useState, useContext } from 'react';
import './css/squares.css';

const DContext = createContext();

const Dice9x9Provider = ({ children }) => {
  const [diceValue, setDiceValue] = useState(0);
  const Dice = [1, 2, 3, 4, 8];

  const rollDice = () => {
    let n = Dice[Math.floor(Math.random() * Dice.length)];
    setDiceValue(n);
  };

  return (
    <DContext.Provider value={{ diceValue, rollDice }}>
      {children}
    </DContext.Provider>
  );
};

const Dice = () => {
  const { diceValue, rollDice } = useContext(DContext);

  const handleDiceClick = () => {
    rollDice();
  };

  return (
    <button className="dice-wrapper" onClick={handleDiceClick}>
      {diceValue}
    </button>
  );
};

export { DContext, Dice9x9Provider, Dice };
