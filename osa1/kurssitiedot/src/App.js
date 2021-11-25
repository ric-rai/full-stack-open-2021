import React from 'react'

const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
    <div>
        <Part part={props.data[0].name} exercise={props.data[0].exercises} />
        <Part part={props.data[1].name} exercise={props.data[1].exercises} />
        <Part part={props.data[2].name} exercise={props.data[2].exercises} />
    </div>
)

const Part = (props) => <p>{props.part} {props.exercise}</p>

const Total = (props) => <p>Number of exercises {props.numberOfExercises}</p>

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
           <Header course={course} />
            <Content data={[part1, part2, part3]} />
            <Total numberOfExercises={part1.exercises + part2.exercises + part3.exercises} />
        </div>
    )
}

export default App