import "../../App.css";

function SearchForm({ value, handleSubmit }) {
  return (
    <form onSubmit={(ev) => handleSubmit(ev.target.value)} className="catalog-search-form form-inline">
      <input 
        type="text"
        name="search"
        className="form-control" 
        placeholder="Поиск" 
        value={value}
        onKeyPress={(ev) => handleSubmit(ev.target.value)}
        />
    </form>
  );
}

export default SearchForm;
