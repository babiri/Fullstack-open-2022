import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><b>Number of exercises {sum}</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key={part.id} part={part} />
    )}
  </>

const Course = ({ course }) => {

  const sumValues = (course) => {
    const exercises = course.parts.map(part => part.exercises)
    const sum = exercises.reduce((partialSum, a) => partialSum + a, 0)
    return sum
  }

  return (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sum={sumValues(course)} />
  </>
  )
}

export default Course