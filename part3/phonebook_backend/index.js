const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json(), cors())
app.use(morgan((tokens, req, res) => [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    req.method === 'POST' ? JSON.stringify(req.body) : ''
  ].join(' ')
))

const handleDelete = (req, res) => {
  persons = persons.filter(p => p.id !== Number(req.params.id))
  res.status(204).end()
} 
const handleGetPerson = (req, res) => {
  const person = persons.find(p => p.id === Number(req.params.id)) 
  person ? res.json(person) : res.status(404).end()

}
const handlePost = (req, res) => {
  const send400 = msg => res.status(400).json({error: msg}) 
  const pExists = p => persons.some(per => per.name === p.name)
  const isObjEmpty = obj => !Object.keys(obj).length 
  const person = {...req.body}
  if (isObjEmpty(person)) send400("Response body is missing") 
  else if (!person?.name) send400("Name is missing") 
  else if (pExists(person)) send400("Name must be unique") 
  else if (!person?.number) send400("Number is missing") 
  else {
    person.id = Math.round(Math.random() * 1000000000000)
    persons = persons.concat(person)
    res.status(201).json(person)
  }
}

app.get('/api/persons', (req, res) => res.json(persons))
app.get('/api/persons/:id', handleGetPerson)
app.delete('/api/persons/:id', handleDelete)
app.post('/api/persons', handlePost)

app.get('/api/info', (req, res) => res.send(`
    <div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    </div>
`))

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))