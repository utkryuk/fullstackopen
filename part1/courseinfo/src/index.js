import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part part = {props.part1} exercise = {props.exercises1} />
            <Part part = {props.part2} exercise = {props.exercises2} />
            <Part part = {props.part3} exercise = {props.exercises3} />
        </div>
    )
}

const Part = (props) => {
    return (
        <p>{props.part} {props.exercise}</p>
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    )
}

const App = () => {
    
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }

  return (
    <div>
        <Header course = {course.name} />
        <Content part1 = {parts[0].name} exercises1 = {parts[0].exercises} part2 = {parts[1].name} exercises2 = {parts[1].exercises} exercises3 = {parts[2].exercises} part3 = {parts[2].name}/>
        <Total exercises1 = {parts[0].exercises} exercises2 = {parts[1].exercises} exercises3 = {parts[2].exercises} />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))