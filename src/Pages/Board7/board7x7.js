import React, { useEffect, useState, createContext, useContext } from 'react'
import './css/squares.css'
import Squares from './CoinSquare'
import { DContext } from './dice'


const p1 = [3, 2, 1, 0, 7, 14, 21, 28, 35, 42, 43, 44, 45, 46, 47, 48, 41, 34, 27, 20, 13, 6, 5, 4, 12, 19, 26, 33, 40, 39, 38, 37, 36, 29, 33, 15, 8, 9, 10, 11, 18, 25, 32, 31, 30, 23, 16, 17, 24]; // red
const p2 = [21, 28, 35, 42, 43, 44, 45, 46, 47, 48, 41, 34, 27, 20, 13, 6, 5, 4, 3, 2, 1, 0, 7, 14, 8, 9, 10, 11, 12, 19, 26, 33, 40, 39, 38, 37, 36, 29, 22, 15, 16, 17, 18, 25, 32, 31, 30, 23, 24];// blue
const p4 = [27, 20, 13, 6, 5, 4, 3, 2, 1, 0, 7, 14, 21, 28, 35, 42, 43, 44, 45, 46, 47, 48, 41, 34, 40, 39, 38, 37, 36, 29, 22, 15, 8, 9, 10, 11, 12, 19, 26, 33, 32, 31, 30, 23, 16, 17, 18, 25, 24];// yellow
const p3 = [45, 46, 47, 48, 41, 34, 27, 20, 13, 6, 5, 4, 3, 2, 1, 0, 7, 14, 21, 28, 35, 42, 43, 44, 36, 29, 22, 15, 8, 9, 10, 11, 12, 19, 26, 33, 40, 39, 38, 37, 30, 23, 16, 17, 18, 25, 32, 31, 24]; // pink


const colors = ["red", "blue", "yellow", "pink"];
const noOfCoinsPerColor = 4;

const iniSQState = [];
for (let i = 0; i < 49; i++) {
    const isColorIndex = [3, 21, 27, 45].includes(i);
    iniSQState.push({
        noOfCoin: isColorIndex ? noOfCoinsPerColor : 0,
        color: isColorIndex ? Array.from({ length: noOfCoinsPerColor }, () => colors[isColorIndex ? [3, 21, 27, 45].indexOf(i) : 0]) : [],
        enableCoin: isColorIndex
    });
}

const safeZone = [3, 21, 27, 45, 8, 16, 12, 18, 32, 40, 30, 36, 24];
const safeMap = new Map([['red', 3], ['blue', 21], ['pink', 45], ['yellow', 27], ['home', 24]]);
export const squareContext = createContext();
function Board7x7() {
    const [updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const { diceValue } = useContext(DContext);
    const [stateSQ, setStateSQ] = useState({ squares: iniSQState });
    const [winner, setWinner] = useState('None');

    const winCheck = () => {
        const currState = stateSQ.squares;
        console.log(currState[24].color);
        if (currState[24].noOfCoin >= 4) {
            const winArr = currState[24].color;
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
                movePlayer: movePlayer,
            }}
        >
            <div className="board-wrapper">
                {/* Create a 7x7 grid layout */}
                {Array.from({ length: 7 }).map((_, rowIndex) => (
                    <div key={rowIndex} className="board-row">
                        {Array.from({ length: 7 }).map((_, colIndex) => {
                            const index = rowIndex * 7 + colIndex;
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

export default Board7x7;