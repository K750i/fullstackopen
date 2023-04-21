import Person from "./Person"

export default function Display({ persons, filter }) {
  return (
    <ul>
      {
        filter === ''
          ? persons.map(person => <Person key={person.id} person={person} />)
          : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map(person => <Person key={person.id} person={person} />)
      }
    </ul>
  )
}