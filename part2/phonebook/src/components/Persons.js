const Person = ({ person, deletePerson }) => {
  return (
    <>
      {person.name} {person.number} <button onClick={deletePerson}>delete</button>
      <br />
    </>
  )
}

const Persons = ({ persons, deletePerson }) => {
  return (
    <>
      <h1>Numbers</h1>
      {persons.map(person =>
        <Person key={person.id} person={person} deletePerson={() => deletePerson(person)} />
      )}
    </>)
}

export default Persons