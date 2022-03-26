import React, { useState, useEffect } from 'react'
import axios from "axios"
const api_key = process.env.REACT_APP_API_KEY

const Input = ({label, value, onChange}) => (
    <div>{label}:{" "}
        <input value={value} onChange={onChange}/>
    </div>
)

const Message = ({msg}) => {
    if (msg === '') return null
    else return <div>{msg}</div>
} 

const CountryNames = ({names, handleCountryClick}) => 
    names.map(n => <CountryName key={n} name={n} handleCountryClick={handleCountryClick}/>)

const CountryName = ({name, handleCountryClick}) => 
    <div>{name} <Button text="show" handleClick={handleCountryClick(name)}/></div> 

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

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
            <Weather capital={countryData.capital[0]}/>
        </div>
    )
} 

const Weather = ({capital}) => {
    const [weather, setWeather] = useState(null)

    const fetchWeather = () => void axios
        .get(`http://api.openweathermap.org/data/2.5/weather?units=metric&q=${capital}&appid=${api_key}`)
        .then(r => (setWeather(r.data)))
    useEffect(fetchWeather, []) 

    if (!weather) return null
    else return (
        <div>
            <h2>Weather in {weather.name}</h2>
            <div>temperature {weather.main.temp} Celsius</div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <div>wind {weather.wind.speed} m/s</div>
        </div>
    )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [countryNames, setCountryNames] = useState([])
    const [filtered, setFiltered] = useState([])
    const [currentFilter, setCurrentFilter] = useState('')
    const [msg, setMsg] = useState('')
    const [country, setCountry] = useState(null)

    const fetchCountries = () => void axios
        .get('https://restcountries.com/v3.1/all')
        .then(r => (setCountries(r.data), setCountryNames(r.data.map(c => c.name.common))))
    useEffect(fetchCountries, [])

    const handleFilterChange = e => changeFilter(e.target.value)
    const getCountry = name => countries.find(c => c.name.common === name) 
    const setFilterStates = (f = [], msg = "", coName = null) => 
        (setFiltered(f), setCountry(getCountry(coName)), setMsg(msg))
    const handleCountryClick = name => () => setFilterStates(filtered, "", name)
    const filter = (value)  => {
        const fNames = countryNames.filter(n => n.match(new RegExp(value, 'i')))
        if (fNames.length > 10) setFilterStates([], "Too many matches, specify another filter")
        else if (fNames.length === 1) setFilterStates([], "", fNames[0])
        else setFilterStates(fNames, "", 
            fNames.some(n => country && n === country.name.common) ? country.name.common : null)
    }
    const changeFilter = (value) => {
        setCurrentFilter(value)
        if (value !== '') filter(value)
        else setFilterStates() 
    } 

    return (
        <div>
            <Input label={'find countries'} value={currentFilter} onChange={handleFilterChange}/>
            <Message msg={msg}/>
            <CountryNames names={filtered} handleCountryClick={handleCountryClick}/>
            <CountryData countryData={country}/>
        </div>
    )

}

export default App