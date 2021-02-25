import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const createBlog = async (newBlog) => {
    const config = {
        headers: {
            'Authorization': token
        }
    }
    try {
        const response = await axios.post(baseUrl, newBlog, config)
        return response.data

    }
    catch (error){
        alert(`error: ${error}`)
    }
}

const updateBlog = async (newBlog, id) => {
    const config = {
        headers: {
            'Authorization': token
        }
    }

    try {
        const response = await axios.put(`${baseUrl}/${id}`, newBlog, config)
        return response.data
    }
    catch (error){
        alert(`error: ${error}`)
    }
}

const deleteBlog = async (id) => {
    const config = {
        headers: {
            'Authorization': token
        }
    }

    try {
        const response = await axios.delete(`${baseUrl}/${id}`, config)
        return response.data
    }
    catch (error) {
        alert(`error: ${error}`)
    }
}

export default { getAll , setToken, createBlog, updateBlog, deleteBlog }