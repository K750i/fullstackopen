import Person from "./Person"

export default function Display({ persons, filter, handleDelete }) {
  return (
    <ul>
      {
        filter === ''
          ? persons.map(person =>
            <Person key={person.id} person={person} handleDelete={() => handleDelete(person.id)} />
          )
          : persons
            .filter(person =>
              person.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map(person =>
              <Person key={person.id} person={person} handleDelete={() => handleDelete(person.id)} />
            )
      }
    </ul>
  )
}