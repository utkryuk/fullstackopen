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

export const likeBlog = (blog) => {
    return async dispatch => {

        const blogToBeUpdated = {
            author: blog.author,
            title: blog.title,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id
        }
        const updatedBlog = await blogService.updateBlog(blogToBeUpdated, blog.id)

        dispatch({
            type: 'LIKE_BLOG',
            data: updatedBlog
        })
    }
}

export const deleteBlog = (blogId) => {
    return async dispatch => {
        await blogService.deleteBlog(blogId)
        
        dispatch({
            type: 'DELETE_BLOG',
            data: blogId
        })
    }
}

const blogsReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_BLOGS':
            return action.data

        case 'ADD_BLOG':
            return [...state, action.data]

        case 'LIKE_BLOG':
            return state.map((blog) => {
                return action.data.id !== blog.id ? blog : action.data
            })

        case 'DELETE_BLOG':
            return state.filter((blog) => {
                return action.data !== blog.id
            })

        default:
            return state

    }
}

export default blogsReducer