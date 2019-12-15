import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const MostVoted = ({votes, highest, anecdotes}) => {
  let isVotes = false
  Object.keys(votes).forEach(el => {
    if(votes[el] > 0) {
      isVotes = true
    }
  })
  if(isVotes) {
    return (
      <>
        <div>{anecdotes[highest]}</div>
        <div>has {votes[highest]} votes</div>
      </>
    )
  }
  return <div>There is currently no votes</div>
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  })
  const [mostVotes, setMost] = useState(null)


  const nextAnecdote = () => {
    const random = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(random)
  }

  const handleVote = () => {
    const copy = {...votes}
    copy[selected] += 1
    let highest = Object.keys(copy).reduce((a, b) => copy[a] > copy[b] ? a : b)
    setMost(highest)
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>has {votes[selected] || 0} votes</div>
      <button onClick={handleVote}>Upvote Anecdote</button>
      <button onClick={nextAnecdote}>Next Anecdote</button>
      <h2>Anecdote with the most votes</h2>
      <MostVoted votes={votes} highest={mostVotes} anecdotes={props.anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root'))