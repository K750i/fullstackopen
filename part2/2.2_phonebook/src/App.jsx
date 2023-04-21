import { useState } from 'react'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import Display from './components/Display'
import './App.css'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  let nextId = persons.length

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name={filter} handleFilter={(e) => setFilter(e.target.value)} />
      <h2>Add a New Number</h2>
      <AddForm
        name={newName}
        number={newNumber}
        handleSubmit={handleSubmit}
        handleAddName={(e) => setNewName(e.target.value)}
        handleAddNumber={(e) => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <Display persons={persons} filter={filter} />
    </div>
  )

  function handleSubmit(e) {
    e.preventDefault()
    const personExist = persons.find(person => person.name === newName)

    if (personExist) {
      alert(`${newName} was already added to the phonebook`)
      return
    }

    setPersons([
      ...persons,
      { name: newName, number: newNumber, id: ++nextId }
    ])
    setNewName('')
    setNewNumber('')
  }
}

export default App
