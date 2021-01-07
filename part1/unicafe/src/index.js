import React, {useState} from 'react'
import ReactDOM from 'react-dom'


// const FeedBack = (props) => {


//   return (
//     <div>
      // <h1>give feedback</h1>
      // <br></br>
      // <Button handleClick = {goodClick} text = "good" />
      // <Button handleClick = {neutralClick} text = "neutral" />
      // <Button handleClick = {badClick} text = "bad" />
//     </div>

//   )

// }

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}


const Statistic = (props) => {
  return (
    <tbody>
    <tr>{props.text}<td/>{props.value}<td/></tr>
    </tbody>
    
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const average = props.good - props.bad
  if (all === 0){
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
      <Statistic text = "good" value = {props.good} />
      <Statistic text = "neutral" value = {props.neutral} />
      <Statistic text = "bad" value = {props.bad} />
      <Statistic text = "all" value = {all} />
      <Statistic text = "average" value = {average/all} />
      <Statistic text = "positive" value = {(props.good*100)/all + " %"} />
    
      </table>
      
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)


  const goodClick = () => {
    setGood(good + 1)
  }

  const neutralClick = () => {
    setNeutral(neutral + 1)
  }

  const badClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {goodClick} text = "good" />
      <Button handleClick = {neutralClick} text = "neutral" />
      <Button handleClick = {badClick} text = "bad" />
      <Statistics good = {good} bad = {bad} neutral = {neutral}/>
    </div>
  )

}


ReactDOM.render(<App/>, document.getElementById('root'))