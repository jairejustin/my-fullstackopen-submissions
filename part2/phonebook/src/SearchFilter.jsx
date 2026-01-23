export default function SearchFilter(props) {
  return (
    <form>
      <p>filter shown with:
        <input onChange={props.handleFilter}/>
      </p>
    </form>
  )
}
