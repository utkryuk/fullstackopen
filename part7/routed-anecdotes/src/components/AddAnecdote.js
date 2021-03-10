import { useState } from 'react' 
import { useHistory } from 'react-router-dom'

const AddAnecdote = (props) => {
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content,
            author,
            info,
            votes: 0
        })
        setContent('')
        setAuthor('')
        setInfo('')
        
        props.setNotification(`a new anecdote ${content} created!`)
        setTimeout(() => {
            props.setNotification('')
        }, 10000)

        history.push('/')
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div>
                    author
                    <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    url for more info
                    <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
                </div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AddAnecdote