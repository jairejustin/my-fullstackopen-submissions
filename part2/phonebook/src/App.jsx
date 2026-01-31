import { useEffect, useState } from 'react'
import SearchFilter from './SearchFilter';
import PersonForms from './PersonForms';
import Persons from './Persons';
import personService from './personService'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    personService
      .getAllPersons()
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [])

  const filteredPersons = filterQuery === ''
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      person.number.includes(filterQuery)
    );

  const handleFilter = (e) => {
    setFilterQuery(e.target.value);
  }

  const handleDeletePerson = (id) => {
    const person = persons.find(p => id === p.id)
    alert(`removed "${person.name}"`);

    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
      })
  }

  const setNewPerson = (e) => {
    e.preventDefault()

    if (newName === '') {
      alert('Please add a name');
      return;
    }
    if (newNumber === '') {
      alert(`Please add a number for ${newName}`)
      return;
    }

    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase());

    if (existingPerson) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        const changedPerson = { ...existingPerson, number: newNumber };

        personService
          .updatePerson(existingPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : response.data
            ));
            setNewName('');
            setNewNumber('');
          })
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .createPerson(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewNumber('');
        setNewName('');
      })
      .catch(error => {
        alert("Failed to add person");
        console.error(error);
      });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter handleFilter={handleFilter} />

      <h2>Add a new</h2>
      <PersonForms
        setNewPerson={setNewPerson}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons
        filteredPersons={filteredPersons}
        onDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App