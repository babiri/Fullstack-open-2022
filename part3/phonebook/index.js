const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

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

app.use(express.static('build'))
app.use(express.json());
morgan.token('body', req => {
  if (req.body) {
    return JSON.stringify(req.body)
  } else {
    return '-'
  }
})
app.use(morgan(':method :url :body'));
app.use(cors());

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  const timestamp = Date()
  const people = persons.length
  const page = `<p>Phonebook has info for ${people} people</p><p>${timestamp}</p>`
  response.send(page)
})

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min)
}

const generateId = () => getRandomInt(1, 10000000);

const existsInArray = (array, name) => array.find(item => item.name === name) 

app.post('/api/persons', (req, res) => {
  const body = req.body
  console.log(req.headers);

  if (!body.name || !body.number) {

    return res.status(400).json({
      error: 'name/number can not be blank'
    })
  } else if (existsInArray(persons, body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }
  persons = persons.concat(person);
  res.json(person);
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
