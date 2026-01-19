const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
};

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => {
        return <Part key={part.name} part={part}/>
      })}
    </div>
  )
};

const Total = ({ parts }) => {
  let sum = 0;
  for(const part of parts)
  {
    sum = part.exercises + sum;
  }
  return (
    <p>Number of Exercises {sum}</p>
  )
}



const App = () => {

  const course = {
    name : 'Half Stack application development',
    parts : [
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
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App;