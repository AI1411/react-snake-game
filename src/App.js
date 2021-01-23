import React, {useState, useEffect} from "react";
import Field from "./components/Field";
import Navigation from "./components/Navigation";
import ManipulationButton from "./components/ManipulationPanel";
import Button from "./components/Button";
import {initFields} from "./utils";

const initialPosition = {x: 17, y: 17}
const initFieldsValues = initFields(35, initialPosition);
const defaultInterval = 500;

const GameStatus = Object.freeze({
    init: 'init',
    playing: 'playing',
    suspended: 'suspended',
    gameOver: 'gameOver'
})

let timer = undefined;

const unsubscribe = () => {
    if (timer) {
        return;
    }
    clearInterval(timer);
}

const isCollision = (fieldSize, position) => {
    if (position.y < 0 || position.x < 0) {
        return true;
    }

    if (position.y > fieldSize - 1 || position.x > fieldSize - 1) {
        return true;
    }
    return false;
}


function App() {
    const [fields, setFields] = useState(initFieldsValues);
    const [position, setPosition] = useState();
    const [status, setStatus] = useState(GameStatus.init);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        setPosition(initialPosition);
        timer = setInterval(() => {
            setTick(tick => tick + 1);
        }, defaultInterval);
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!position || status !== GameStatus.playing) {
            return;
        }
        const canContinue = goUp();
        if (!canContinue) {
            setStatus(GameStatus.gameOver);
        }
    }, [tick]);

    const onStart = () => setStatus(GameStatus.playing);

    const onRestart = () => {
        timer = setInterval(() => {
            setTick(tick => tick + 1);
        }, defaultInterval);
        // setDirection(Direction.up);
        setStatus(GameStatus.init);
        setPosition(initialPosition);
        setFields(initFields(35, initialPosition));
    }

    const goUp = () => {
        const {x, y} = position;
        const newPosition = {x, y: y - 1}
        if (isCollision(fields.length, newPosition)) {
            unsubscribe();
            return false;
        }
        fields[y][x] = '';
        fields[newPosition.y][x] = 'snake';
        setPosition(newPosition);
        setFields(fields);
        return true;
    }
    return (
        <div className="App">
            <header className="header">
                <div className="title-container">
                    <h1 className="title">Snake Game</h1>
                </div>
                <Navigation/>
            </header>
            <main className="main">
                <Field fields={fields}/>
            </main>
            <Button status={status} onStart={onStart} onRestart={onRestart}/>
            <ManipulationButton/>
        </div>
    );
}

export default App;
