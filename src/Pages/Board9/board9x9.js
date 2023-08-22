import React,{useEffect,useState,createContext,useContext} from 'react'
import './css/squares.css'
import Squares from './CoinSquare'
import {DContext} from './dice'


const p1 = [2,1,0,5,10,15,20,21,22,23,24,19,14,9,4,3,8,13,18,17,16,11,6,7,12]; //red
const p2 = [10,15,20,21,22,23,24,19,14,9,4,3,2,1,0,5,6,7,8,13,18,17,16,11,12]; //blue
const p3 = [22,23,24,19,14,9,4,3,2,1,0,5,10,15,20,21,16,11,6,7,8,13,18,17,12]; //pink
const p4 = [14,9,4,3,2,1,0,5,10,15,20,21,22,23,24,19,18,17,16,11,6,7,8,13,12]; //yellow

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



const safeZone = [4,36,44,76];
const safeMap = new Map([['red', 4], ['blue', 36], ['pink', 76],['yellow',44],['home',40]]);
export const squareContext = createContext();function Board9x9() {
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

  const generateNextIdx = (idx, color) => {
    const currentPlayer = color === 'red' ? p1 : color === 'blue' ? p2 : color === 'pink' ? p3 : p4;
    const currAIdx = currentPlayer.findIndex((ele) => ele === idx);
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
}


      return (
        <squareContext.Provider
            value={{
                stateSQ: stateSQ,
                setStateSQ: setStateSQ,
                generateNextIdx: generateNextIdx,
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
                <div className="test-w">
                    <span>Winner is {winner}</span>
                </div>
            </div>
        </squareContext.Provider>
  );
}

export default Board9x9;