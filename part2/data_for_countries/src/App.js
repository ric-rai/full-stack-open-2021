import React, { useState, useEffect } from 'react'
import axios from "axios"

const Input = ({label, value, onChange}) => (
    <div>{label}:{" "}
        <input value={value} onChange={onChange}/>
    </div>
)

const CountryNames = ({names}) => 
    names.map(n => <CountryName key={n} name={n}/>)

const CountryName = ({name}) => <div>{name}</div> 

const CountryData = ({countryData}) => {
    if (!countryData) return null
    else return (
        <div>
            <h1>{countryData.name.common}</h1>
            <div>capital {countryData.capital[0]}</div>
            <div>area {countryData.area}</div>
            <div>
                <h3>languages:</h3>
                <ul>{Object.values(countryData.languages).map(l => <li key={l}>{l}</li>)}</ul>
                <img src={countryData.flags.png} width="200"/> 
            </div>
        </div>
    )
} 

const App = () => {
    const [countries, setCountries] = useState([])
    const [countryNames, setCountryNames] = useState([])
    const [filtered, setFiltered] = useState([])
    const [currentFilter, setCurrentFilter] = useState('')
    const [countryData, setCountryData] = useState(null)

    const fetchCountries = () => void axios
        .get('https://restcountries.com/v3.1/all')
        .then(r => (setCountries(r.data), setCountryNames(r.data.map(c => c.name.common))))
    useEffect(fetchCountries, [])

    const handleFilterChange = e => changeFilter(e.target.value)
    const setFilteredHideCountry = filtered => (setFiltered(filtered), setCountryData(null))
    const setCountryDataHideFiltered = name => 
        (setCountryData(countries.find(c => c.name.common === name)), setFiltered([])) 
    const filter = value => {
        const f = countryNames.filter(n => n.match(new RegExp(value, 'i')))
        if (f.length > 10) setFilteredHideCountry(["Too many matches, specify another filter"])
        else if (f.length === 1) setCountryDataHideFiltered(f[0])
        else setFilteredHideCountry(f)
    }
    const changeFilter = (value) => {
        setCurrentFilter(value)
        if (value === '') setFiltered([]) 
        else filter(value) 
    } 

    return (
        <div>
            <Input label={'find countries'} value={currentFilter} onChange={handleFilterChange}/>
            <CountryNames names={filtered}/>
            <CountryData countryData={countryData}/>
        </div>
    )

}

export default App