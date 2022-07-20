import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
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
