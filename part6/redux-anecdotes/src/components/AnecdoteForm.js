import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        dispatch(createAnecdote(content))
        
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
        dispatch(showNotification(`${content} added`))
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit = {addAnecdote}>
                <div><input name = 'anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>

    )
}

export default AnecdoteForm