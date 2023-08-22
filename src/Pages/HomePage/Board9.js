import React from 'react';
import {Dice9x9Provider,Dice} from '../Board9/dice';
import Board9x9 from '../Board9/board9x9';

function Board() {
  return (
    <Dice9x9Provider>
      <div className="App">
        <Board9x9 />
        <Dice />
      </div>
    </Dice9x9Provider>
  );
}

export default Board;
