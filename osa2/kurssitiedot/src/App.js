import React from 'react'

const Header = ({name}) => <h1>{name}</h1>

const Course = ({course}) => (
    <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
    </div>
)

const Content = ({parts}) => (
    <div>
        {parts.map(p =>
            <Part key={p.id} name={p.name} exercise={p.exercises}/>
        )}
    </div>
)

const Part = ({exercise, name}) => <p>{name} {exercise}</p>

const Total = ({parts}) => (
    <h3>Total of {parts.reduce((p, n) => p + n.exercises, 0)}</h3>
)

const App = () => {
    const course = {
        name: 'Half Stack application development',
        id: 1,
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

export default App