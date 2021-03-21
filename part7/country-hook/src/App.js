import { useCountry, useField } from './hooks'
import Country from './components/Country'

const App = () => {

    const name = useField('text')
    const country = useCountry(name.value)

    const handleFormSubmit = (event) => {
        event.preventDefault()
    }
    return (
        <div>
            <form onSubmit = {handleFormSubmit}>
                <input {...name}></input>
                <button type = 'submit'>find</button>
            </form>

            <Country country = {country}/>
        </div>
    )

}

export default App;
