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

export default Persons