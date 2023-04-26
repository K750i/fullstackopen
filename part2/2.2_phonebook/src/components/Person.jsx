export default function Person({ person, handleDelete }) {
  return (
    <li>
      {person.name}{' '}
      {person.number}{' '}
      <button onClick={handleDelete}>delete</button>
    </li>
  )
}