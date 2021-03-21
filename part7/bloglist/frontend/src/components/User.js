import React from 'react'
import { makeStyles, List, ListItem, ListItemText } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}))

const User = ({ user }) => {

    const classes = useStyles()

    if (!user) {
        return null
    }

    return (
        <div>
            <h1>{user.name}</h1>
            <h3>Added Blogs</h3>

            <List component="nav" className={classes.root} aria-label={`blogs of ${user.name}`}>
                {user.blogs.map(blog => {
                    return <ListItem button key = {blog.id}>
                        <ListItemText primary = {blog.title} />
                    </ListItem>
                })
                }
            </List>
        </div>
    )
}

export default User