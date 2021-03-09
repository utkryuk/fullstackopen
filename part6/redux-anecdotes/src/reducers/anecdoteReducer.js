export const vote = (id) => {
    return {
        type: 'VOTE',
        data: {
            id: id
        }
    }
}

export const createAnecdote = (content) => {
    return {
        type: 'ADD_ANECDOTE',
        data: content
    }
}

export const initializeAnecdotes = (anecdotes) => {
    return {
        type: 'INIT_ANECDOTE',
        data: anecdotes
    }
}

const reducer = (state = [], action) => {
    switch(action.type) {
        case 'VOTE':
            return state.map((anecdote) => {
                return action.data.id !== anecdote.id ? anecdote : {...anecdote, votes: anecdote.votes + 1}
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