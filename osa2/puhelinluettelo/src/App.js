import React, { useState } from 'react'

const Person = ({name, numer}) => <p>{name} {numer}</p>

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: "040-1231244"}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleInputChange = (setter) => e => setter(e.target.value)

    const addPerson = e => {
        e.preventDefault()
        if (persons.map(p => p.name).includes(newName))
            alert(`${newName} is already added to phonebook`)
        else {
            setPersons(persons.concat({name: newName, number: newNumber}))
            setNewName('')
            setNewNumber('')
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>name:
                    <input value={newName} onChange={handleInputChange(setNewName)}/>
                </div>
                <div> number:
                    <input value={newNumber} onChange={handleInputChange(setNewNumber)}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(p => <Person key={p.name} name={p.name} numer={p.number}/>)}
        </div>
    )

}

export default App