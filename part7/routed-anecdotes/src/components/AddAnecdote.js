import { useHistory } from 'react-router-dom'
import { useField } from '../hooks/index'

const AddAnecdote = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })

        content.setValue('')
        author.setValue('')
        info.setValue('')

        props.setNotification(`a new anecdote ${content.value} created!`)
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
                    <input name='content' value={content.value} onChange={content.onChange} />
                </div>
                <div>
                    author
                    <input name='author' value={author.value} onChange={author.onChange} />
                </div>
                <div>
                    url for more info
                    <input name='info' value={info.value} onChange={info.onChange} />
                </div>
                <button type = 'submit'>create</button>
            </form>
        </div>
    )
}

export default AddAnecdote