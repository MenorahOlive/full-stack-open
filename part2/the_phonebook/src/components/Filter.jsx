const Filter = ({ newSearch, handleFilter }) => {
  return (
    <div>
      filter shown with
      <input value={newSearch} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
