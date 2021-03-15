import React, { useEffect } from 'react'
import  { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'
import LoginMessage from './LoginMessage'
import { Link } from 'react-router-dom'

const Users = () => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const users = useSelector(state => state.users)
    
    return (
        <div>
            <div>
                <h2>blogs</h2>
                <LoginMessage />
            </div>
            <div>
                <h2>Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>blogs created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                            return <tr key = {user.id}>
                                <td><Link to= {`/users/${user.id}`}>{user.name}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users