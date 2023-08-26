import React, { useState, useContext, useEffect } from 'react'
import './css/squares.css'
import { squareContext,safeZone } from './board5x5'

function Coin(props) {
    const {movePlayer} = useContext(squareContext);
    return (
        <div className = "g-wrapper" style = {{
            backgroundColor : props.color,
        }} onClick = {()=>movePlayer(props.squareIdx,props.color)}>
            {props.squareIdx}
        </div>
    )
}


function Squares(props) {
    const { stateSQ } = useContext(squareContext);
    const [gArray, setGArray] = useState([]);
    useEffect(() => {
        
        if (stateSQ.squares[props.index].enableCoin) {
            let ggArr = [];
            for (let i = 0; i < stateSQ.squares[props.index].noOfCoin; i++) {
                ggArr.push({color : stateSQ.squares[props.index].color});
            }
            
            setGArray(ggArr);
        }
    }, [stateSQ])

    const isSafeZone = safeZone.includes(props.index);

    return (
        <div className={`square-wrapper ${isSafeZone ? 'safe-zone' : ''}`}>
            {
                (stateSQ.squares[props.index].enableCoin && gArray.length !== 0) && <div className="Coin-wrapper">
                    {
                        gArray.map((item,index) => {
                            return (
                                <React.Fragment key = {index}>
                                    <Coin color = {item.color[index]} squareIdx = {props.index}/>
                                </React.Fragment>
                            )
                        })
                    }
                </div> 
            }
        </div>
    )
}

export default Squares
