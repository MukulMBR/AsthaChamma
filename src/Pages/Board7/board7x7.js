import React,{useEffect,useState,createContext,useContext} from 'react'
import './css/squares.css'
import Squares from './CoinSquare'
import {DContext} from './dice'


const p1 = [3,2,1,0,7,14,21,28,35,42,43,44,45,46,47,48,41,34,27,20,13,6,5,4,12,19,26,33,40,39,38,37,36,29,33,15,8,9,10,11,18,25,32,31,30,23,16,17,24]; // red
const p2 = [21,14,7,0,1,2,3,4,11,18,25,32,39,46,53,54,55,48,41,34,27,20,13,6,5,12,19,26,33,40,47,60,59,58,57,56,49,42,35,28,21,14,15,22,29,36,43,50,57]; // blue
const p3 = [42,35,28,21,14,7,0,1,8,15,22,29,36,43,50,57,56,49,42,35,28,21,14,7,6,13,20,27,34,41,48,55,54,53,52,45,38,31,24,17,10,3,4,11,18,25,32,39,46]; // pink
const p4 = [56,49,42,35,28,21,14,15,22,29,36,43,50,57,54,55,48,41,34,27,20,13,6,5,12,19,26,33,40,47,60,59,58,57,56,49,42,35,28,21,14,7,0,1,2,9,16,23,30]; // yellow


const iniSQState = [
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 4,
        color : ["red","red","red","red"],
        enableCoin : true
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },

    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },    
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },    
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },    
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },    
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },    
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },    
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 4,
        color : ["blue","blue","blue","blue"],
        enableCoin : true
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 4,
        color : ["yellow","yellow","yellow","yellow"],
        enableCoin : true
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },

    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },    
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },    
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },    
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },    
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },    
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },    
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 4,
        color : ["pink","pink","pink","pink"],
        enableCoin : true
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    },
    {
        noOfCoin : 0,
        color : [],
        enableCoin : false
    }
]

const safeZone = [3,21,27,45,8,16,12,18,32,40,30,36,24];
const safeMap = new Map([['red', 3], ['blue', 21], ['pink', 45],['yellow',27],['home',24]]);
export const squareContext = createContext();function Board7x7() {
  const [updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const { diceValue } = useContext(DContext);
  const [stateSQ, setStateSQ] = useState({ squares: iniSQState });
  const [winner, setWinner] = useState('None');

  const winCheck = () => {
    const currState = stateSQ.squares;
    console.log(currState[12].color);
    if (currState[12].noOfCoin >= 4) {
      const winArr = currState[12].color;
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
    
        switch(color){
            case 'red' : {
                let currAIdx = p1.findIndex((ele) => ele === idx);
                let nextIdx = p1[currAIdx + diceValue];
                let currState = stateSQ.squares;
                
                currState[idx].noOfCoin -= 1;
                if(currState[idx].noOfCoin === 0) currState[idx].enableCoin = false;
                let nc = currState[idx].color;
                let ri = nc.findIndex(ele => ele === color);
                nc.splice(ri,1);
                currState[idx].color = nc;

                
                if(currState[nextIdx].noOfCoin != 0 && !safeZone.find(next => next === nextIdx)){
                    let clr = currState[nextIdx].color;
                    let inin = clr.length;
                    let repColor;
                    for(let i = 0 ;i < inin ;i++){
                        if(clr[i] !== color){
                            repColor = clr[i];
                            break;
                        }
                    }
                    let flag = 0;
                    let repIdx;
                    if(repColor){
                        repIdx = safeMap.get(repColor);
                        flag = 1;
                    }
                    
                    clr = clr.filter(item => item === color);
                    let newn = clr.length;

                    let diff = Math.abs(inin - newn);
                    currState[nextIdx].noOfCoin -= diff;
                    if(flag){
                        currState[repIdx].noOfCoin += diff;
                        for(let i = 0; i < diff ;i++){
                            currState[repIdx].color.push(repColor);
                        }
                    }
                    clr.push(color);
                    currState[nextIdx].noOfCoin += 1;
                    currState[nextIdx].color = clr;
                    currState[nextIdx].enableCoin = true;     
                }
                else{
                    currState[nextIdx].noOfCoin += 1;
                    currState[nextIdx].color.push(color);
                    currState[nextIdx].enableCoin = true;
                }
                
                
                setStateSQ({squares : currState});
                
            }
            break;
            case "blue":{
                let currAIdx = p2.findIndex((ele) => ele === idx);
                let nextIdx = p2[currAIdx + diceValue];
                let currState = stateSQ.squares;
                
                currState[idx].noOfCoin -= 1;
                if(currState[idx].noOfCoin === 0) currState[idx].enableCoin = false;
                let nc = currState[idx].color;
                let ri = nc.findIndex(ele => ele === color);
                nc.splice(ri,1);
                currState[idx].color = nc;

                
                if(currState[nextIdx].noOfCoin != 0 && !safeZone.find(next => next === nextIdx)){
                    let clr = currState[nextIdx].color;
                    let inin = clr.length;
                    let repColor;
                    for(let i = 0 ;i < inin ;i++){
                        if(clr[i] !== color){
                            repColor = clr[i];
                            break;
                        }
                    }
                    let flag = 0;
                    let repIdx;
                    if(repColor){
                        repIdx = safeMap.get(repColor);
                        flag = 1;
                    }
                    
                    clr = clr.filter(item => item === color);
                    let newn = clr.length;

                    let diff = Math.abs(inin - newn);
                    currState[nextIdx].noOfCoin -= diff;
                    if(flag){
                        currState[repIdx].noOfCoin += diff;
                        for(let i = 0; i < diff ;i++){
                            currState[repIdx].color.push(repColor);
                        }
                    }
                    clr.push(color);
                    currState[nextIdx].noOfCoin += 1;
                    currState[nextIdx].color = clr;
                    currState[nextIdx].enableCoin = true;     
                }
                else{
                    currState[nextIdx].noOfCoin += 1;
                    currState[nextIdx].color.push(color);
                    currState[nextIdx].enableCoin = true;
                }
                
                setStateSQ({squares : currState});

            } 
            break;
            case "pink":{
                let currAIdx = p3.findIndex((ele) => ele === idx);
                let nextIdx = p3[currAIdx + diceValue];
                let currState = stateSQ.squares;
                
                currState[idx].noOfCoin -= 1;
                if(currState[idx].noOfCoin === 0) currState[idx].enableCoin = false;
                let nc = currState[idx].color;
                let ri = nc.findIndex(ele => ele === color);
                nc.splice(ri,1);
                currState[idx].color = nc;

                
                if(currState[nextIdx].noOfCoin != 0 && !safeZone.find(next => next === nextIdx)){
                    let clr = currState[nextIdx].color;
                    let inin = clr.length;
                    let repColor;
                    for(let i = 0 ;i < inin ;i++){
                        if(clr[i] !== color){
                            repColor = clr[i];
                            break;
                        }
                    }
                    let flag = 0;
                    let repIdx;
                    if(repColor){
                        repIdx = safeMap.get(repColor);
                        flag = 1;
                    }
                    
                    clr = clr.filter(item => item === color);
                    let newn = clr.length;

                    let diff = Math.abs(inin - newn);
                    currState[nextIdx].noOfCoin -= diff;
                    if(flag){
                        currState[repIdx].noOfCoin += diff;
                        for(let i = 0; i < diff ;i++){
                            currState[repIdx].color.push(repColor);
                        }
                    }
                    clr.push(color);
                    currState[nextIdx].noOfCoin += 1;
                    currState[nextIdx].color = clr;
                    currState[nextIdx].enableCoin = true;     
                }
                else{
                    currState[nextIdx].noOfCoin += 1;
                    currState[nextIdx].color.push(color);
                    currState[nextIdx].enableCoin = true;
                }
                
                setStateSQ({squares : currState});
                
            } 
            break;
            case "yellow":{
                let currAIdx = p4.findIndex((ele) => ele === idx);
                let nextIdx = p4[currAIdx + diceValue];
                let currState = stateSQ.squares;
                
                currState[idx].noOfCoin -= 1;
                if(currState[idx].noOfCoin === 0) currState[idx].enableCoin = false;
                let nc = currState[idx].color;
                let ri = nc.findIndex(ele => ele === color);
                nc.splice(ri,1);
                currState[idx].color = nc;

                if(currState[nextIdx].noOfCoin != 0 && !safeZone.find(next => next === nextIdx)){
                    let clr = currState[nextIdx].color;
                    let inin = clr.length;
                    let repColor;
                    for(let i = 0 ;i < inin ;i++){
                        if(clr[i] !== color){
                            repColor = clr[i];
                            break;
                        }
                    }
                    let flag = 0;
                    let repIdx;
                    if(repColor){
                        repIdx = safeMap.get(repColor);
                        flag = 1;
                    }
                    
                    clr = clr.filter(item => item === color);
                    let newn = clr.length;

                    let diff = Math.abs(inin - newn);
                    currState[nextIdx].noOfCoin -= diff;
                    if(flag){
                        currState[repIdx].noOfCoin += diff;
                        for(let i = 0; i < diff ;i++){
                            currState[repIdx].color.push(repColor);
                        }
                    }
                    clr.push(color);
                    currState[nextIdx].noOfCoin += 1;
                    currState[nextIdx].color = clr;
                    currState[nextIdx].enableCoin = true;     
                }
                else{
                    currState[nextIdx].noOfCoin += 1;
                    currState[nextIdx].color.push(color);
                    currState[nextIdx].enableCoin = true;
                }
                
                setStateSQ({squares : currState});
                
            } 
            break;
        }
        
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