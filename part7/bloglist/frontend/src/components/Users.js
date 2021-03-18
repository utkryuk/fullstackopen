import React, { useEffect } from 'react'
import  { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, makeStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles({
    table: {
        maxWidth: '100vw'
    }
})

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}))(TableRow)

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell)


const Users = () => {
    
    const dispatch = useDispatch()
    const classes = useStyles()

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const users = useSelector(state => state.users)
    
    return (
        <div>
            <h2>
                Users
            </h2>
            <TableContainer component = {Paper}>
                <Table className = {classes.table}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>User</StyledTableCell>
                            <StyledTableCell align = 'right'>Number of Blogs Created</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => {
                            return <StyledTableRow key = {user.id}>
                                <StyledTableCell>
                                    <Link to = {`/users/${user.id}`}>{user.name}</Link>
                                </StyledTableCell>
                                <StyledTableCell align = 'right'>
                                    {user.blogs.length}
                                </StyledTableCell>
                            </StyledTableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Users