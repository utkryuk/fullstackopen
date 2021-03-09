import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        const newAnecdote = await anecdoteService.addAnecdote(content)
        dispatch(createAnecdote(newAnecdote))
        
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