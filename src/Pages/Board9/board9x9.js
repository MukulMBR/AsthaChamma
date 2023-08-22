import React,{useEffect,useState,createContext,useContext} from 'react'
import './css/squares.css'
import Squares from './CoinSquare'
import {DContext} from './dice'


const p1 = [2,1,0,5,10,15,20,21,22,23,24,19,14,9,4,3,8,13,18,17,16,11,6,7,12]; //red
const p2 = [10,15,20,21,22,23,24,19,14,9,4,3,2,1,0,5,6,7,8,13,18,17,16,11,12]; //blue
const p3 = [22,23,24,19,14,9,4,3,2,1,0,5,10,15,20,21,16,11,6,7,8,13,18,17,12]; //pink
const p4 = [14,9,4,3,2,1,0,5,10,15,20,21,22,23,24,19,18,17,16,11,6,7,8,13,12]; //yellow

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

const safeZone = [2,10,22,14,12];
const safeMap = new Map([['red', 2], ['blue', 10], ['pink', 22],['yellow',14],['home',12]]);
export const squareContext = createContext();function Board9x9() {
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

export default Board9x9;