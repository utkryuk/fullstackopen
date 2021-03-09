export const filterAnecdote = (filter) => {
    return {
        type: 'FILTER_ANECDOTE',
        data: {
            filter
        }
    }
}

const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTER_ANECDOTE':
            return action.data.filter
        default:
            return state
    }
}

export default filterReducer