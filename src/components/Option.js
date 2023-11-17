import React from "react";

export default function Option({option, isHeld, optionCorrect, setInfo, showResult, id}){
    const style = {
        backgroundColor: showResult ?
                        (optionCorrect ? "rgb(59, 190, 59)" : (isHeld && "#f17575"))  :
                        isHeld ? "rgb(194, 194, 194)" : "",
        color: showResult ?
                        (optionCorrect ? "black" : (isHeld && "black"))  :
                        isHeld ? "black" : "",
        boxShadow: showResult ? 
                    isHeld ? "none" : (optionCorrect && "none") :
                    isHeld ? "none" : ""
    }

    return (
        <div 
            className="option" 
            style={style}
            onClick={() => !showResult && setInfo(id)}
        >
                {option}
        </div>
    )
}