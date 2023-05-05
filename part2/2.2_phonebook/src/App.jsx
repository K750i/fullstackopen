import { useState, useEffect } from 'react';
import phoneService from './services/phoneService';
import Filter from './components/Filter';
import AddForm from './components/AddForm';
import Display from './components/Display';
import Notification from './components/Notification';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    phoneService
      .getAll()
      .then(persons => {
        setPersons(persons);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={error} />
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
      <Display persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );

  function handleSubmit(e) {
    e.preventDefault();
    const personExist = persons.find(person => person.name === newName);

    if (personExist) {
      if (confirm(`${personExist.name} is already added to phonebook, replace the old number with the new one?`)) {
        phoneService
          .updatePhone(personExist.id, { ...personExist, number: newNumber })
          .then(updatedPerson => {
            setPersons(persons.map(person =>
              person.id === personExist.id ? updatedPerson : person
            ));
            toggleMessage(`Phone number for ${updatedPerson.name} has been changed.`, false);
          })
          .catch(err => toggleMessage(err.response.data.error, true));
      }
      return;
    }

    phoneService
      .create({ name: newName, number: newNumber })
      .then(createdPerson => {
        setPersons([
          ...persons,
          createdPerson
        ]);
        toggleMessage(`${createdPerson.name} has been added.`, false);
        setNewName('');
        setNewNumber('');
      })
      .catch(err => toggleMessage(err.response.data.error, true));
  }

  function handleDelete(id) {
    const target = persons.find(person => person.id === id);
    if (confirm(`Delete ${target.name}?`)) {
      phoneService.deletePerson(id);
      setPersons(persons.filter(person => person.id !== id));
      toggleMessage(`${target.name} has been deleted`, false);
    }
  }

  function toggleMessage(msg, error) {
    setMessage(msg);
    setError(error);
    setTimeout(() => setMessage(null), 3500);
  }
}

export default App;
