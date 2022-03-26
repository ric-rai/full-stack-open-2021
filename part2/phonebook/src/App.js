import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const PersonForm = ({onSubmitHandler, inputs}) => (
    <form onSubmit={onSubmitHandler}>
        {inputs.map(i => <Input {...i} key={i.label}/> )}
        <div><button type="submit">add</button></div>
    </form>
)

const Input = props => <div>{props.label}:{" "} <input {...props}/></div>

const Persons = ({persons, handleDelete}) => persons.map(p => 
    <Person {...p} key={p.name} handleDelete={handleDelete}/>)

const Person = ({name, number, handleDelete}) => 
    <div>{name} {number} <Button text={"delete"} handleClick={handleDelete(name)}/></div> 

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const App = () => {
    const [persons, setPersons] = useState([])
    const [filtered, setFiltered] = useState(persons)
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const setValueWith = (setter) => e => setter(e.target.value)

    const fetchPersons = () => void personService.getAll()
        .then(pers => (setPersons(pers), setFiltered([...pers])))
    useEffect(fetchPersons, [])

    const addPerson = e => {
        e.preventDefault()
        const resetForm = () => (setNewName(''), setNewNumber('')) 
        const updPersons = pers => (setPersons(pers), changeFilter(filter, [...pers]))
        if (persons.map(p => p.name).includes(newName))
            alert(`${newName} is already added to phonebook`)
        else personService.create({name: newName, number: newNumber}).then(p =>
            (updPersons(persons.concat(p)), resetForm()))
    }
    const getPerIdByName = name => persons.find(p => p.name === name).id
    const handleDelete = name => () => {
        const pers = persons.filter(p => p.name !== name)
        if (window.confirm(`Delete ${name}?`)) 
            personService.del(getPerIdByName(name)).then(() => 
                (setPersons(pers), changeFilter(filter, [...pers])))
    }
    const handleFilterChange = e => changeFilter(e.target.value)
    const changeFilter = (value, pers = persons) => {
        setFilter(value)
        if (value === '') setFiltered([...pers])
        else setFiltered(pers.filter(p => p.name.match(new RegExp(value, 'i'))))
    } 

    return (
        <div>
            <h2>Phonebook</h2>
                <Input label={'filter'} value={filter} onChange={handleFilterChange}/>
            <h2>Add a new</h2>
            <PersonForm onSubmitHandler={addPerson} inputs={[
                {label: 'name', value: newName, onChange: setValueWith(setNewName)},
                {label: 'number', value: newNumber, onChange: setValueWith(setNewNumber)}
            ]}/>
            <h2>Numbers</h2>
            <Persons persons={filtered} handleDelete={handleDelete}/>
        </div>
    )

}

export default App