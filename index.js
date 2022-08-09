const express = require('express')
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

app.use(express.json())

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

app.post('/api/persons', (request, response) => {
  const query = request.query;
  const personsNames = persons.map(person => person.name)x
  const existingPerson = personsNames.find(p => p === query.name)
  if (!query.name || !query.number) {
    return response.status(400).json({
      error: 'name/number can not be blank'
    })
  } else if (existingPerson) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  const randomId = generateId()
  const person = {
    name: query.name,
    number: query.number,
    id: randomId
  }

  persons = persons.concat(person);
  response.json(person);
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
})

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
