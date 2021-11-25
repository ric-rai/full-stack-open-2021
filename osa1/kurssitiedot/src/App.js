import React from 'react'

const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
    <div>
        <Part part={props.data[0].part} exercise={props.data[0].exercise} />
        <Part part={props.data[1].part} exercise={props.data[1].exercise} />
        <Part part={props.data[2].part} exercise={props.data[2].exercise} />
    </div>
)

const Part = (props) => <p>{props.part} {props.exercise}</p>

const Total = (props) => <p>Number of exercises {props.numberOfExercises}</p>

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
           <Header course={course} />
            <Content data={[1, 2, 3].map(n =>
                ({part: eval("part" + n), exercise: eval("exercises" + n)}))} />
            <Total numberOfExercises={exercises1 + exercises2 + exercises3} />
        </div>
    )
}

export default App