export default function AddForm({ name, number, handleSubmit, handleAddName, handleAddNumber }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={name} onChange={handleAddName} />
      </div>
      <div>
        number: <input value={number} onChange={handleAddNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}