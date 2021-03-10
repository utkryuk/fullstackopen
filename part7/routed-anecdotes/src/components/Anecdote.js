import React from 'react'

const Anecdote = ({ anecdote }) => {
    return (
        <div>
            <h3>{anecdote.content} by {anecdote.author}</h3>
            <p>
                has {anecdote.votes} votes
            </p>
        </div>
    )
}

export default Anecdote