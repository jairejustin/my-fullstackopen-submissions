export default function Persons(props) {
  const filteredPersons = props.filteredPersons;
  return (
    <div>
    {filteredPersons.map(person => 
        <div key={person.name}>{person.name} {person.number}</div>
    )}
  </div>
  )
}
