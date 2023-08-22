import React from 'react';
import {Dice7x7Provider,Dice} from '../Board7/dice';
import Board7x7 from '../Board7/board7x7';

function Board() {
  return (
    <Dice7x7Provider>
      <div className="App">
        <Board7x7 />
        <Dice />
      </div>
    </Dice7x7Provider>
  );
}

export default Board;
