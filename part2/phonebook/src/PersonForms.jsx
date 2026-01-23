export default function PersonForms(props) {
  return (
    <form onSubmit={props.setNewPerson}>
        <div>
          name: 
          <input 
          value={props.newName} 
          onChange={(e) => props.setNewName(e.target.value)} />
          <br/>
          number: 
          <input 
          value={props.newNumber}
          onChange={(e) => props.setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
