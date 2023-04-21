export default function Filter({ name, handleFilter }) {
  return (
    <div>
      Filter shown with: <input value={name} onChange={handleFilter} />
    </div>
  )
}