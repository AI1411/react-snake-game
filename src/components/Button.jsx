import React from 'react';

const Button = ({status, onStart, onRestart}) => {
    return (
        <div className="button">
            {
                status === "gameOver"
                    ?
                    <button onClick={onRestart}>Game Over</button>
                    :
                    <button onClick={onStart}>Start</button>
            }
        </div>
    );
}


export default Button;
