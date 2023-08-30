import React, { useEffect, useState, createContext, useContext } from 'react'
import './css/squares.css'
import Squares from './CoinSquare'
import { DContext } from './dice'

const p1 = [4, 3, 2, 1, 0, 9, 18, 27, 36, 45, 54, 63, 72, 73, 74, 75, 76, 77, 78, 79, 80, 71, 62, 53, 44, 35, 26, 17, 8, 7, 6, 5, 16, 25, 34, 43, 52, 61, 70, 69, 68, 67, 66, 65, 64, 55, 46, 37, 28, 19, 10, 11, 12, 13, 14, 15, 24, 33, 42, 51, 60, 59, 58, 57, 56, 47, 38, 29, 20, 21, 22, 23, 32, 41, 50, 49, 48, 39, 30, 31, 40]; //red
const p2 = [36, 45, 54, 63, 72, 73, 74, 75, 76, 77, 78, 79, 80, 71, 62, 53, 44, 35, 26, 17, 8, 7, 6, 5, 4, 3, 2, 1, 0, 9, 18, 27, 10, 11, 12, 13, 14, 15, 16, 25, 34, 43, 52, 61, 70, 69, 68, 67, 66, 65, 64, 55, 46, 37, 28, 19, 20, 21, 22, 23, 24, 33, 42, 51, 60, 59, 58, 57, 56, 47, 38, 29, 30, 31, 32, 41, 50, 49, 48, 39, 40]; //blue
const p3 = [76, 77, 78, 79, 80, 71, 62, 53, 44, 35, 26, 17, 8, 7, 6, 5, 4, 3, 2, 1, 0, 9, 18, 27, 36, 45, 54, 63, 72, 73, 74, 75, 64, 55, 46, 37, 28, 19, 10, 11, 12, 13, 14, 15, 16, 25, 34, 43, 52, 61, 70, 69, 68, 67, 66, 65, 56, 47, 38, 29, 20, 21, 22, 23, 24, 33, 42, 51, 60, 59, 58, 57, 48, 39, 30, 31, 32, 41, 50, 49, 40]; //pink
const p4 = [44, 35, 26, 17, 8, 7, 6, 5, 4, 3, 2, 1, 0, 9, 18, 27, 36, 45, 54, 63, 72, 73, 74, 75, 76, 77, 78, 79, 80, 71, 62, 53, 70, 69, 68, 67, 66, 65, 64, 55, 46, 37, 28, 19, 10, 11, 12, 13, 14, 15, 16, 25, 34, 43, 52, 61, 60, 59, 58, 57, 56, 47, 38, 29, 20, 21, 22, 23, 24, 33, 42, 51, 50, 49, 48, 39, 30, 31, 32, 41, 40]; //yellow

const colors = ["red", "blue", "yellow", "pink"];
const noOfCoinsPerColor = 4;

const iniSQState = [];
for (let i = 0; i < 81; i++) {
  const isColorIndex = [4, 36, 44, 76].includes(i);
  iniSQState.push({
    noOfCoin: isColorIndex ? noOfCoinsPerColor : 0,
    color: isColorIndex ? Array.from({ length: noOfCoinsPerColor }, () => colors[isColorIndex ? [4, 36, 44, 76].indexOf(i) : 0]) : [],
    enableCoin: isColorIndex
  });
}

export const safeZone = [0,4,8,10,16,36,39,41,31,44,,49,64,70,72,76,80,24,20,56,60];
const safeMap = new Map([['red', 4], ['blue', 36], ['pink', 76], ['yellow', 44], ['home', 40]]);
export const squareContext = createContext(); function Board9x9() {
  const [updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const { diceValue } = useContext(DContext);
  const [stateSQ, setStateSQ] = useState({ squares: iniSQState });
  const [winner, setWinner] = useState('None');

  const winCheck = () => {
    const currState = stateSQ.squares;
    console.log(currState[40].color);
    if (currState[40].noOfCoin >= 4) {
      const winArr = currState[40].color;
      winArr.sort();
      let ct = 0;
      let currC = winArr[0];
      for (let i = 0; i < winArr.length; i++) {
        if (winArr[i] === currC) {
          ct++;
        } else {
          ct = 1;
          currC = winArr[i];
        }
        if (ct >= 4) {
          return currC;
        }
      }
    }
    return 'None';
  };

  useEffect(() => {
    console.log('checking winner');
    const win = winCheck();
    setWinner(win);
  }, [stateSQ]);

  const movePlayer = (idx, color) => {
    const currentPlayer = color === 'red' ? p1 : color === 'blue' ? p2 : color === 'pink' ? p3 : p4;
    const currAIdx = currentPlayer.findIndex((ele) => ele === idx);
    if (diceValue <= currentPlayer.length - currAIdx - 1) {
      const nextIdx = currentPlayer[currAIdx + diceValue];
      const currState = stateSQ.squares;

      currState[idx].noOfCoin -= 1;
      if (currState[idx].noOfCoin === 0) currState[idx].enableCoin = false;
      const nc = currState[idx].color;
      const ri = nc.findIndex(ele => ele === color);
      nc.splice(ri, 1);
      currState[idx].color = nc;

      if (currState[nextIdx].noOfCoin != 0 && !safeZone.find(next => next === nextIdx)) {
        const clr = currState[nextIdx].color;
        const inin = clr.length;
        let repColor;
        for (let i = 0; i < inin; i++) {
          if (clr[i] !== color) {
            repColor = clr[i];
            break;
          }
        }
        let flag = 0;
        let repIdx;
        if (repColor) {
          repIdx = safeMap.get(repColor);
          flag = 1;
        }

        const newClr = clr.filter(item => item === color);
        const newn = newClr.length;

        const diff = Math.abs(inin - newn);
        currState[nextIdx].noOfCoin -= diff;
        if (flag) {
          currState[repIdx].noOfCoin += diff;
          for (let i = 0; i < diff; i++) {
            currState[repIdx].color.push(repColor);
          }
        }
        newClr.push(color);
        currState[nextIdx].noOfCoin += 1;
        currState[nextIdx].color = newClr;
        currState[nextIdx].enableCoin = true;
      } else {
        currState[nextIdx].noOfCoin += 1;
        currState[nextIdx].color.push(color);
        currState[nextIdx].enableCoin = true;
      }

      setStateSQ({ squares: currState });
    } else {
      alert("you cannot move this coin");
      return;
    }
  }


  return (
    <squareContext.Provider
      value={{
        stateSQ: stateSQ,
        setStateSQ: setStateSQ,
        movePlayer: movePlayer,
      }}
    >
      <div className="board-wrapper">
        {/* Create a 9x9 grid layout */}
        {Array.from({ length: 9 }).map((_, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {Array.from({ length: 9 }).map((_, colIndex) => {
              const index = rowIndex * 9 + colIndex;
              return <Squares key={index} index={index} />;
            })}
          </div>
        ))}

        {/* Display winner */}
        <div className="text">
          <span>Winner is {winner}</span>
        </div>
      </div>
    </squareContext.Provider>
  );
}

export default Board9x9;