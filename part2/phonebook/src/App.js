import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({ person }) => {
  return (
    <>
      {person.name} {person.number}
      <br />
    </>
  )
}

const Persons = ({ persons }) => {
  return (
    <>
      <h1>Numbers</h1>
      {persons.map(person =>
        <Person key={person.id} person={person} />
      )}
    </>)
}

const Filter = ({filter, handleFilterChange}) => {
  return (
    <>
      filter shown with: <input value={filter} onChange={handleFilterChange} />
    </>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={ handleNameChange } />
        </div>
        <div>
          number: <input value={newNumber} onChange={ handleNumberChange } />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personsArray = persons.map(person => person.name) 
    if (personsArray.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    personsArray.includes(newName)
    ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
