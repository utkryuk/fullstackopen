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
  catch {
    alert('error')
  }
}

export default { getAll , setToken, createBlog}