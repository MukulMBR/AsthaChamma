import React from 'react';
import {Dice5x5Provider,Dice} from '../Board5/dice';
import Board5x5 from '../Board5/board5x5';

function Board() {
  return (
    <Dice5x5Provider>
      <div className="App">
        <Board5x5 />
        <Dice />
      </div>
    </Dice5x5Provider>
  );
}

export default Board;
