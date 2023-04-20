const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sum={getTotalExercisesFrom(course.parts)} />
    </div>
  )

  function getTotalExercisesFrom(parts) {
    return parts.reduce((total, next) => total + next.exercises, 0)
  }
}

const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ sum }) => <h3>Total of {sum} exercises</h3>

const Part = ({ name, exercises }) =>
  <p>
    {name} {exercises}
  </p>

const Content = ({ parts }) =>
  parts.map(part =>
    <Part key={part.id} name={part.name} exercises={part.exercises} />)


export default Course