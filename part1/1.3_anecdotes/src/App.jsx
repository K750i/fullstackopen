import { useState } from 'react'

function App() {
  const anecdotesList = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [anecdotes, setAnecdotes] = useState(anecdotesList.map(v => ({ anecdote: v, votes: 0 })))
  const [selected, setSelected] = useState(0)
  const [highestVotedAnecdote, setHighestVotedAnecdote] = useState(Object.assign({}, anecdotes[0]))

  const handleNext = () => {
    const generateRandomNum = () => Math.floor(Math.random() * anecdotes.length)
    let randomNum = generateRandomNum()

    while (randomNum === selected) {
      randomNum = generateRandomNum()
    }

    setSelected(randomNum)
  }

  const handleVote = () => {
    const updatedAnecdotes = anecdotes.map((item, index) => {
      return (selected === index) ? { anecdote: item.anecdote, votes: item.votes + 1 } : item
    })
    const highest = getHighestVoted(updatedAnecdotes)
    setAnecdotes(updatedAnecdotes)
    setHighestVotedAnecdote(highest)
  }

  return (
    <div>
      <h2>Anecdote of the Day</h2>
      {anecdotes[selected].anecdote}
      <br />
      has {anecdotes[selected].votes} votes.
      <br />
      <Button handleClick={handleVote}>Vote</Button>
      <Button handleClick={handleNext}>Next anecdote</Button>
      <h2>Anecdote with Most Votes</h2>
      {highestVotedAnecdote.anecdote}
      <br />
      has {highestVotedAnecdote.votes} votes.
    </div>
  )

  function getHighestVoted(anecdotes) {
    return anecdotes.reduce((a, b) => a.votes >= b.votes ? a : b)
  }
}

function Button({ handleClick, children }) {
  return (
    <button onClick={handleClick}>{children}</button>
  )
}

export default App
