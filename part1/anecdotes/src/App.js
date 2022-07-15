import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button> 
  )
}

const Anecdote = ({ title, anecdote, votes }) => {
  return (
    <div>
      <h1>{ title }</h1>
      <br />
      { anecdote }
      <p>has { votes } votes </p>
      <br />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const zeroArray = new Uint8Array(anecdotes.length); 

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(zeroArray)
  const [mostPoints, setMostPoints] = useState(0)

  const getRandomItemIndex = (array) => Math.floor(Math.random() * array.length)

  const maxIndex = (array) => array.indexOf(Math.max(...array))

  const handleSetSelected = () => {
    setSelected(getRandomItemIndex(anecdotes))
  }

  const handleVoteSelected = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    setMostPoints(maxIndex(copy))
  }

  return (
    <div>
      <Anecdote title="Anectode of the day" anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button handleClick={handleVoteSelected} text="vote" />
      <Button handleClick={handleSetSelected} text="next anecdote" />
      <br />
      <Anecdote title="Anectode with most votes" anecdote={anecdotes[mostPoints]} votes={points[mostPoints]} />
    </div>
  )
}

export default App
