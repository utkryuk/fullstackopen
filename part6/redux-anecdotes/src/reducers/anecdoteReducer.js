import anecdoteService from '../services/anecdotes'

export const vote = (anecdote) => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.updateAnecdote({...anecdote, votes: anecdote.votes + 1})
        dispatch({
            type: 'VOTE',
            data: updatedAnecdote
        })
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.addAnecdote(content)
        dispatch({
            type: 'ADD_ANECDOTE',
            data: newAnecdote
        })
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTE',
            data: anecdotes
        })
    }
}

const reducer = (state = [], action) => {
    switch(action.type) {
        case 'VOTE':
            return state.map((anecdote) => {
                return action.data.id !== anecdote.id ? anecdote : action.data
            })

        case 'ADD_ANECDOTE': 
            return [...state, action.data]
        
        case 'INIT_ANECDOTE':
            return action.data

        default:
            return state
    }
}

export default reducer