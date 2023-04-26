import { useState, useEffect } from 'react'
import phoneService from './services/phoneService'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import Display from './components/Display'
import './App.css'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phoneService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

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

    phoneService
      .create({ name: newName, number: newNumber })
      .then(createdPerson => {
        setPersons([
          ...persons,
          createdPerson
        ])
      })

    setNewName('')
    setNewNumber('')
  }
}

export default App
