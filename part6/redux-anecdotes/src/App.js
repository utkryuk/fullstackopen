import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote, createAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

  // const vote = (id) => {
  //   console.log('vote', id)
  //   dispatch()
  // }

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
    }

    return (
        <div>
        <h2>Anecdotes</h2>
        {anecdotes
        .sort((a, b) => {
            return b.votes - a.votes
        })
        .map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
            </div>
            </div>
        )}
        <h2>create new</h2>
        <AnecdoteForm />
        </div>
    )
}

export default App