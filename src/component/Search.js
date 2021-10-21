
const Search = (props) => {

    return (
        <div className='container'>
            <h1>City Weather</h1>
            <input type='text' ref={props.searchRef} />
            <button onClick={() => props.onSearchHandler()}>
                Find
            </button>
        </div>
    )
}

export default Search;