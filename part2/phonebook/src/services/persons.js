import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseUrl)

    return req.then((response) => {
        return response.data
    })

}

const addPerson = (newPerson) => {
    const req = axios.post(baseUrl, newPerson)

    return req.then((response) => {
        return response.data
    })
}




export default {getAll, addPerson};