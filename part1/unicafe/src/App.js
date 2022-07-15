import { useState } from 'react'

const Title = () => <h1>give feedback</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button> 
)

const StatisticLine = ({ text, value, percentage }) => {
  if (percentage === "percentage") {
    return (
      <tr>
        <td>
          { text }
        </td>
        <td>
          { value} %
        </td>
      </tr>
    )
  }
  return (
    <tr>
      <td>
        { text }
      </td>
      <td>
        { value}
      </td>
    </tr>
  )
}


const Statistics = (props) => {
  const { good, neutral, bad, all} = props

  const calculatePositive = (array) => {
    var positive = 0
    
    array.forEach(feedback => {
      if (feedback === 1)
        positive= positive+1
      
    })
    return positive * 100 / array.length
  }

  const calculateAverage = (array) => {
    const sum = array.reduce((a, b) => a + b, 0)
    const avg = sum / array.length || 0
    return avg
  }
  
  if (all.length === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={ good } />
          <StatisticLine text="neutral" value={ neutral } />
          <StatisticLine text="bad" value={ bad } />
          <StatisticLine text="all" value={ all.length } />
          <StatisticLine text="average" value={calculateAverage(all)} />
          <StatisticLine text="positive" value={calculatePositive(all)} percentage="percentage" />
        </tbody>
      </table>
    </div>
    
    )
  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])

  const handleSetGoodClick = () => {
    setGood(good + 1)
    setAll(all.concat(1))
  }

  const handleSetNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all.concat(0))
  }
  const handleSetBadClick = () => {
    setBad(bad + 1)
    setAll(all.concat(-1))
  }

  return (
    <div>
      <Title />
      <Button handleClick={handleSetGoodClick} text='good' />
      <Button handleClick={handleSetNeutralClick} text='neutral' />
      <Button handleClick={handleSetBadClick} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>

  )
}

export default App