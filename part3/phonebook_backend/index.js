const express = require('express')
const app = express()

let pers = [
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

app.use(express.json())

const getPerById = id => pers.find(p => p.id === Number(id)) 
const sendJsonOr404 = (res, o) => o ? res.json(o) : res.status(404).end()
const delPer = id => pers = pers.filter(p => p.id !== Number(id))
const setNewId = p => (p.id = Math.round(Math.random() * 1000000000000), p)
const addPer = p => (pers = pers.concat(setNewId(p)), pers)

const hdlDel = (req, res) => (delPer(req.params.id), res.status(204).end()) 
const hdlGetPer = (req, res) => sendJsonOr404(res, getPerById(req.params.id))
const hdlPost = (req, res) => (console.log(req), res.json(addPer(req.body))) 

app.get('/api/persons', (req, res) => res.json(pers))
app.get('/api/persons/:id', hdlGetPer)
app.delete('/api/persons/:id', hdlDel)
app.post('/api/persons', hdlPost)

app.get('/api/info', (req, res) => res.send(`
    <div>
        <p>Phonebook has info for ${pers.length} people</p>
        <p>${new Date()}</p>
    </div>
`))

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))