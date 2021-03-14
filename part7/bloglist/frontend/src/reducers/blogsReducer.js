import blogService from '../services/blogs'

export const initialBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addBlog = (title, author, url) => {
    return async dispatch => {

        const newBlog = await blogService.createBlog({ title, author, url})
        dispatch({
            type: 'ADD_BLOG',
            data: newBlog
        })
    }
}

const blogsReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'ADD_BLOG':
            return [...state, action.data]
        default:
            return state

    }
}

export default blogsReducer