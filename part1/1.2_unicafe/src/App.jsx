import { useState } from 'react'
import './App.css'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={() => setGood(good + 1)}>Good</Button>
      <Button handleClick={() => setNeutral(neutral + 1)}>Neutral</Button>
      <Button handleClick={() => setBad(bad + 1)}>Bad</Button>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

function Button({ handleClick, children }) {
  return (
    <button onClick={handleClick}>{children}</button>
  )
}

function Statistics({ good, neutral, bad }) {
  const total = getTotal()
  const average = getAverage()
  const positivePct = getPositivePct()

  if (total === 0) return <p>No feedback given</p>

  return (
    <table>
      <tbody>
        <StatisticLine value={good}>Good</StatisticLine>
        <StatisticLine value={neutral}>Neutral</StatisticLine>
        <StatisticLine value={bad}>Bad</StatisticLine>
        <StatisticLine value={total}>Total feedback</StatisticLine>
        <StatisticLine value={average}>Average Score</StatisticLine>
        <StatisticLine value={positivePct + '%'}>Positive</StatisticLine>
      </tbody>
    </table>
  )

  function getTotal() {
    return good + neutral + bad
  }

  function getAverage() {
    if (total === 0) return 0
    const score = good + (bad * -1)

    return score / total
  }

  function getPositivePct() {
    if (total === 0) return 0
    return good / total * 100
  }
}

function StatisticLine({ value, children }) {
  return (
    <tr>
      <td>{children}</td>
      <td> {value}</td>
    </tr>
  )
}

export default App
