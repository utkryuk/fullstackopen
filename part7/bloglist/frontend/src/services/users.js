import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = async () => {
    try {
        const response = await axios.get(baseUrl)
        return response.data
    }
    catch(error) {
        alert(error)
    }
}

export default { getAllUsers }