export default function Persons(props) {
  const filteredPersons = props.filteredPersons;
  return (
    <div>
      {filteredPersons.map(person => 
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => props.onDeletePerson(person.id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}