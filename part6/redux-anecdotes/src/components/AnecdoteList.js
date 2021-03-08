import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
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

        </div>
    )
}

export default AnecdoteList