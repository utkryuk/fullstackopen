import React, { useEffect } from 'react'
import BlogForm from './BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from '../reducers/blogsReducer'
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

const Blogs = () => {

    const dispatch = useDispatch()
    
    const classes = useStyles()
    
    useEffect(() => {
        dispatch(initialBlogs())
    }, [dispatch])

    const blogs = useSelector(state => state.blogs)
        .sort((a, b) => {
            return b.likes - a.likes
        })
    
    const blogLink = {
        color: 'lightcyan'
    }

    return (
        <div>
            <h2>Blogs</h2>
            <BlogForm />

            <TableContainer component = {Paper}>
                <Table className = {classes.table}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align = 'right'>Details</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {blogs.map(blog => {
                            return <StyledTableRow key = {blog.id}>
                                <StyledTableCell>
                                    <Link style = {blogLink} to = {`/blogs/${blog.id}`}>{blog.title}</Link>
                                </StyledTableCell>
                                <StyledTableCell align = 'right'>
                                    {blog.author}
                                </StyledTableCell>
                            </StyledTableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Blogs