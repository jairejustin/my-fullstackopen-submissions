import { useEffect, useState } from 'react'
import SearchFilter from './SearchFilter';
import PersonForms from './PersonForms';
import Persons from './Persons';
import personService from './personService'
import Message from './Message';

const App = () => {
  // persons state
  const [persons, setPersons] = useState([]);

  // form input states
  const [filterQuery, setFilterQuery] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  // type: 'error' or 'success'
  // content: text content of the message
  const [message, setMessage] = useState({ type: null, content: '' });

  useEffect(() => {
    // get all persons
    personService
      .getAllPersons()
      .then(response => setPersons(response.data))
      // error message
      .catch(error => console.error("Error fetching data:", error));
  }, [])

  const handleFilter = (e) => setFilterQuery(e.target.value);

  const filteredPersons = filterQuery === ''
    ? persons
    : persons.filter(person =>
        // case-insensitive filter
        person.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        person.number.includes(filterQuery)
      ); 

  const handleDeletePerson = (id) => {
    const person = persons.find(p => id === p.id)

    if (confirm(`Delete ${person.name}?`)) {

      // delete person
      personService
        .deletePerson(id)
        .then(() => {
          // update local state
          setPersons(persons.filter(p => p.id !== id));
          // success message
          setMessage({ type: 'success', content: `Removed ${person.name}` });
        })
        .catch(() => {
          setMessage({ 
            type: 'error', 
            content: `Information of ${person.name} has already been removed from server` 
          });
          setPersons(persons.filter(p => p.id !== id));
        });
    }
  }

  const setNewPerson = (e) => {
    e.preventDefault()
    
    // some input guardrails
    if (newName === '' || newNumber === '') {
      alert('Please provide both name and number');
      return;
    }
    
    // dupe check
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase());

    if (existingPerson) {

      // ask if number should be updated
      const confirmation = confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmation) {

        // create object for person's information with updated number
        const changedPerson = { ...existingPerson, number: newNumber };
        
        // update person's number
        personService
          .updatePerson(existingPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : response.data));

            // reset form inputs
            setNewName('');
            setNewNumber('');

            // success message
            setMessage({ type: 'success', content: `Updated ${newName}'s number` });
          })
          .catch(error => {
            // error message
            setMessage({ type: 'error', content: `Failed to update ${newName}` });
            console.log(error);
          });
      }
      return;
    }
    
    // person information to be added
    const personObject = { name: newName, number: newNumber };
    
    // create person
    personService
      .createPerson(personObject)
      .then(response => {
        // update local state
        setPersons(persons.concat(response.data));

        // reset form inputs
        setNewNumber('');
        setNewName('');
        
        // success message
        setMessage({ type: 'success', content: `Added ${newName}` });
      })
      .catch(error => {
        // error message
        setMessage({ type: 'error', content: 'Idk what to put here' });
        console.log(error);
      });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message 
        messageObject={message} 
        onClose={() => setMessage({ type: null, content: '' })} 
      />
      
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