import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (personObject) => {
    personService
      .create(personObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson));
        setNewName('')
        setNewNumber('')
      })
  }

  const updatePerson = personObject => {
    const person = persons.find(n => n.name === personObject.name)
    const id = person.id
    const changedPerson = { ...person, number: personObject.number }

    if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with the new one?`)) {
      personService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        })
    }
  }

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deleteEntry(person.id)
      setPersons(persons.filter(n => n.id !== person.id))
    }
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  const handlePersonForm = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1
    }
    const personsArray = persons.map(person => person.name)
    personsArray.includes(personObject.name)
      ? updatePerson(personObject)
      : addPerson(personObject)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm handlePersonForm={handlePersonForm} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
