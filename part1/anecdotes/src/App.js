import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const array = Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(array)


  const RandomAnecdote = () => {
    const randnum = Math.floor(Math.random() * anecdotes.length);

    if(randnum !== selected) {
      setSelected(randnum)
    }
    else{
      //console.log("rand is: ",randnum)
      //console.log("selected is: ",selected)
      RandomAnecdote()
    }
  }
  const Vote = () => {
    const addVote = [...votes]
    addVote[selected] += 1
    setVotes(addVote)
  }




  return (
      <div>
        <h1>Anecdote of The day</h1>
        {anecdotes[selected]}
        <p>has {votes[selected]} votes</p>
        <div>
        <button onClick={() => RandomAnecdote()}>next anecdote</button>
        <button onClick={() => Vote()}>vote</button>
        </div>
        <h1>Anecdote with most votes</h1>
          <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
          <p>has {votes[votes.indexOf(Math.max(...votes))]} votes</p>
      </div>
  )
}

export default App