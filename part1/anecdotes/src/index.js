import React, {useState} from 'react'
import ReactDOM from 'react-dom'

// const Best = ({votes, anecdotes}) => {

//   let index = 0;
//   let best_anecdote = votes[0]

//   for(let i=0; i<votes.length; i++){
//     if(votes[i] > best_anecdote){
//       best_anecdote = votes[i];
//       index = i;
//     }
//   }

//   best_anecdote = anecdotes[index];
//   console.log(best_anecdote)

//   return (
//     <div>
//       <h1>Anecdote with most votes</h1>
//       {best_anecdote}<br />
//     </div>
//   )
// }

const Button = ({handleClick, text}) => {
  return (
    <button onClick = {handleClick}>{text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, {length: props.anecdotes.length}).map(function() {return 0;}))
  // const [votes, setVotes] = useState(new Uint8Array(6));
  const [mostVotes, setMostVotes] = useState(0)

  

  const next_anecdote = () => {
    setSelected(Math.floor(Math.random()*props.anecdotes.length))
  }

  const vote_anecdote = () => {
    const copy = {...votes } // here votes is a dictionary
    copy[selected] += 1
    setVotes(copy)
    console.log(copy)
    if (copy[selected] > copy[mostVotes]){ // important step
      setMostVotes(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {props.anecdotes[selected]}<br />
      has {votes[selected]} votes<br />
      <Button handleClick = {vote_anecdote} text ="vote" />
      <Button handleClick = {next_anecdote} text = "next anecdote" />
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[mostVotes]}<br />
      has {votes[mostVotes]} votes<br />
      
    </div>
  )
}

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  ReactDOM.render(<App anecdotes = {anecdotes}/>, document.getElementById('root'))
