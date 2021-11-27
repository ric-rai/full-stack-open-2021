import React, { useState } from 'react'

const Person = ({name}) => <h4>{name}</h4>

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const handleNewName = e => setNewName(e.target.value)

    const addPerson = (e) => {
        e.preventDefault()
        setPersons(persons.concat({name: newName}))
        setNewName('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>name:
                    <input
                        value={newName}
                        onChange={handleNewName}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(p => <Person key={p.name} name={p.name}/>)}
        </div>
    )

}

export default App