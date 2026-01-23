import { useState } from 'react'
import SearchFilter from './SearchFilter';
import PersonForms from './PersonForms';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [filterQuery, setFilterQuery] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const filteredPersons = filterQuery === ''
    ? persons
    : persons.filter(person => 
        person.name.toLowerCase().includes(filterQuery.toLowerCase()) || 
        person.number.includes(filterQuery)
      );

  const handleFilter = (e) => {
    setFilterQuery(e.target.value);
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
    
    const isDuplicate = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());
    if (isDuplicate) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    setPersons(persons.concat(personObject))
    setNewNumber('');
    setNewName('');
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
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App