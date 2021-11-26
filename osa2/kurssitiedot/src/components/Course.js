const Course = ({course}) => (
    <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
    </div>
)

const Header = ({name}) => <h1>{name}</h1>

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

export default Course
