import React, { useEffect } from 'react'
import  { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'
import LoginMessage from './LoginMessage'

const Users = () => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const users = useSelector(state => state.users)
    console.log(users)
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
                                <td>{user.name}</td>
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