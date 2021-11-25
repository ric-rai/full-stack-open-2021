import React, { useState } from 'react'

const Header = ({ header }) => <h1>{header}</h1>

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const Display = ({ text, value }) => <p>{text + " " + value}</p>

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const giveGood = () => () => setGood(good + 1)
    const giveNeutral = () => () => setNeutral(neutral + 1)
    const giveBad = () => () => setBad(bad + 1)

    return (
        <div>
            <Header header={"Give feedback"}/>
            <Button handleClick={giveGood()} text={"good"}/>
            <Button handleClick={giveNeutral()} text={"neutral"}/>
            <Button handleClick={giveBad()} text={"bad"}/>
            <Display text={"good"} value={good}/>
            <Display text={"neutral"} value={neutral}/>
            <Display text={"bad"} value={bad}/>
        </div>
    )
}

export default App