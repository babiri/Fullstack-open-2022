require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(express.json())
morgan.token('body', req => {
  if (req.body) {
    return JSON.stringify(req.body)
  } else {
    return '-'
  }
})
app.use(morgan(':method :url :body'))
app.use(cors())

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }})
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  const timestamp = Date()
  Person.find({}).then(persons => {
    const people = persons.length
    const page = `<p>Phonebook has info for ${people} people</p><p>${timestamp}</p>`
    response.send(page)
  })
})

// const getRandomInt = (min, max) => {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min) + min)
// }

// const generateId = () => getRandomInt(1, 10000000);

const existsInArray = (array, name) => array.find(item => item.name === name)

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  const personsArray = []
  const persons = Person.find({}).then(persons => persons.map(person => person.name)
  )
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name/number can not be blank'
    })
  } else if (existsInArray(personsArray, body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
    // id: generateId()
  })
  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    number: body.number
  }

  const opts = { runValidators: true }

  Person.findByIdAndUpdate(request.params.id, person, opts)
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint'})
// }

// app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  // console.log(error);
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
