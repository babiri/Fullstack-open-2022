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

  const addPerson = (event) => {
    event.preventDefault()
    const personsArray = persons.map(person => person.name)
    // if (personsArray.includes(newName)) {
    //   alert(`${newName} is already added to phonebook`)
    // }
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    if (personsArray.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      personService
        .create(personObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson));
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = person => {
    if (window.confirm(`Delete '${person.name}'?`)) {
      personService
        .deleteEntry(person.id)
        // .then(() => setPersons(person.filter(n => n.id !== id)))
        // .catch(error => {
        //   alert(
        //     `the person '${person.name}' with the number '${person.number}' was already deleted`
        //   )
          setPersons(persons.filter(n => n.id !== person.id))
        // })
    }
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons


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
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
