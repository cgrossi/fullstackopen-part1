import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      { text }
    </button>
  )
}

const Statistic = ({ text, counter }) => {
  if(text === 'Positive') {
    return (
      <tr>
        <td>{ text }</td> 
        <td>{ counter } %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{ text }</td>
      <td>{ counter }</td> 
    </tr>
  )
}

const Statistics = ({calcPos, calcAvg, state}) => {
  if(state.all) {
    return (
      <table>
        <tbody>
        <Statistic text='Good' counter={state.good} />
        <Statistic text='Neutral' counter={state.neutral} />
        <Statistic text='Bad' counter={state.bad} />
        <Statistic text='Total' counter={state.all} />
        <Statistic text='Average' counter={calcAvg()} />
        <Statistic text='Positive' counter={calcPos()} />
        </tbody>
      </table>
    )
  }
  return 'No Feedback Given'
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    setAll(all + 1)
    setGood(good + 1)
  }

  const handleBad = () => {
    setAll(all + 1)
    setBad(bad + 1)
  }

  const handleNeutral = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  }

  const calculateAvg = () => {
    return (good + (bad * -1)) / all
  }

  const calcPos = () => (good / all) * 100

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text='Good' handleClick={handleGood} />
      <Button text='Neutral' handleClick={handleNeutral} />
      <Button text='Bad' handleClick={handleBad} />
      <h2>Statistics</h2>
      <Statistics calcPos={calcPos} calcAvg={calculateAvg} state={{'good': good, 'neutral': neutral, 'bad': bad, 'all': all}}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)