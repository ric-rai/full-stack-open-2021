import React, { useState } from 'react'

const Person = ({name, numer}) => <p>{name} {numer}</p>

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456'},
        {name: 'Ada Lovelace', number: '39-44-5323523'},
        {name: 'Dan Abramov', number: '12-43-234345'},
        {name: 'Mary Poppendieck', number: '39-23-6423122'}
    ])
    const [filtered, setFiltered] = useState(persons)
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [currentFilter, setCurrentFilter] = useState('')

    const setValueWith = (setter) => e => setter(e.target.value)

    const addPerson = e => {
        e.preventDefault()
        if (persons.map(p => p.name).includes(newName))
            alert(`${newName} is already added to phonebook`)
        else {
            const updatedPersons = persons.concat({name: newName, number: newNumber})
            setPersons(updatedPersons)
            setNewName('')
            changeFilter(currentFilter, [...updatedPersons])
            setNewNumber('')
        }
    }

    const handleFilterChange = e => changeFilter(e.target.value)
    
    const changeFilter = (value, updatedPersons = persons) => {
        setCurrentFilter(value)
        if (value === '') setFiltered([...updatedPersons])
        else setFiltered(updatedPersons.filter(p => p.name.match(new RegExp(value, 'i'))))
    } 

    return (
        <div>
            <h2>Phonebook</h2>
                <input value={currentFilter} onChange={handleFilterChange}/>
            <h2>Add a new</h2>
            <form onSubmit={addPerson}>
                <div>name:
                    <input value={newName} onChange={setValueWith(setNewName)}/>
                </div>
                <div> number:
                    <input value={newNumber} onChange={setValueWith(setNewNumber)}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {filtered.map(p => <Person key={p.name} name={p.name} numer={p.number}/>)}
        </div>
    )

}

export default App