import React, { useState, useContext, useEffect } from 'react'
import './css/squares.css'
import { squareContext } from './board9x9'

function Coin(props) {
    const {generateNextIdx} = useContext(squareContext);
    return (
        <div className = "g-wrapper" style = {{
            backgroundColor : props.color,
        }} onClick = {()=>generateNextIdx(props.squareIdx,props.color)}>
            {props.squareIdx}
        </div>
    )
}


function Squares(props) {
    const { stateSQ } = useContext(squareContext);
    const [gArray, setGArray] = useState([]);
    useEffect(() => {
        // console.log("stateSQ = ",stateSQ);
        // console.log("yae chala tha")
        if (stateSQ.squares[props.index].enableCoin) {
            let ggArr = [];
            for (let i = 0; i < stateSQ.squares[props.index].noOfCoin; i++) {
                ggArr.push({color : stateSQ.squares[props.index].color});
            }
            //console.log(ggArr);
            setGArray(ggArr);
        }
    }, [stateSQ])
    return (
        <div className="square-wrapper">
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
