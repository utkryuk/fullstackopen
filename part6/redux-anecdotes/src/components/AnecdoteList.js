import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const voteAnecdote = (event, anecdote) => {
        event.preventDefault()
        dispatch(vote(anecdote))

        dispatch(setNotification(`${anecdote.content} voted`, 5))
    }
    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            {anecdotes
                .filter((anecdote) => {
                    return anecdote.content.toLowerCase().includes(filter.toLowerCase())
                })
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
                        <button onClick={(event) => voteAnecdote(event, anecdote)}>vote</button>
                    </div>
                    </div>
            )}

        </div>
    )
}

export default AnecdoteList