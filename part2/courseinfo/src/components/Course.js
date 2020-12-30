import React from 'react'

const Header = (props) => {
    return (
      <h1>
        {props.course}
      </h1>
    )
}
  
const Part = (props) => {
    return (
      <p>{props.part} {props.exercise}</p>
    )
}
  
const Content = ({parts}) => {
    return (
      <div>
        {parts.map((value) => {
          return <Part key = {value['id']} part = {value['name']} exercise = {value['exercises']} />
        })}
      </div>
    )
}
  
const Total = ({parts}) => {
    const total = parts.reduce((sum, value) => {
      return sum + value['exercises']
    }, 0)
  
    return (
        <p><strong>total of {total} exercises</strong></p>
    )
}


const Course = ({course}) => {
    return (
      <div>
        <Header course = {course['name']} />
        <Content parts = {course['parts']} />
        <Total parts = {course['parts']} />
      </div>
    )
}

export default Course;