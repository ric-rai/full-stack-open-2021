import React, { useState } from 'react'

const Header = ({ header }) => <h1>{header}</h1>

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const Display = ({ text, value }) => <p>{text + " " + value}</p>

const Statistics = (props) => {
    const { good, neutral, bad } = props
    const sum = () => good + neutral + bad
    const average = () => ((good - bad) / sum()).toFixed(2)
    const posPercent = () => (good / sum() * 100).toFixed(2)

    return sum() === 0 ? <p>No feedback given</p> : (
        <div>
            <Display text={"all"} value={sum()}/>
            <Display text={"average"} value={average()}/>
            <Display text={"positive"} value={posPercent() + " %"}/>
        </div>
    )
}

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
            <Header header={"Statistics"}/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App
