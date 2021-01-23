import React, {useState, useEffect} from "react";
import Field from "./components/Field";
import Navigation from "./components/Navigation";
import ManipulationButton from "./components/ManipulationPanel";
import Button from "./components/Button";
import {initFields} from "./utils";

const initialPosition = {x: 17, y: 17}
const initFieldsValues = initFields(35, initialPosition);
const defaultInterval = 100

let timer = undefined;

const unsubscribe = () => {
    if (timer) {
        return;
    }
    clearInterval(timer);
}

function App() {
    const [fields, setFields] = useState(initFieldsValues);
    const [position, setPosition] = useState();
    const [tick, setTick] = useState(0);

    useEffect(() => {
        setPosition(initialPosition);
        timer = setInterval(() => {
            setTick(tick => tick + 1);
        }, defaultInterval);
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!position) {
            return;
        }
        goUp();
    }, [tick]);

    const goUp = () => {
        const {x, y} = position;
        const nextY = Math.max(y - 1, 0);
        fields[y][x] = '';
        fields[nextY][x] = 'snake';
        setPosition({x, y: nextY});
        setFields(fields);
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
            <Button/>
            <ManipulationButton/>
        </div>
    );
}

export default App;
