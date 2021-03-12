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
            content: content.input.value,
            author: author.input.value,
            info: info.input.value,
            votes: 0
        })

        props.setNotification(`a new anecdote ${content.input.value} created!`)
        setTimeout(() => {
            props.setNotification('')
        }, 10000)

        history.push('/')
    }

    const resetForm = () => {
        content.reset()
        author.reset()
        info.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content.input} />
                </div>
                <div>
                    author
                    <input {...author.input} />
                </div>
                <div>
                    url for more info
                    <input {...info.input} />
                </div>
                <button type = 'submit'>create</button>
                <button type = 'reset' onClick = {resetForm}>reset</button>
            </form>
        </div>
    )
}

export default AddAnecdote