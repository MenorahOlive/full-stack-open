import { useState } from "react";

const Filter = ({ newSearch, handleFilter }) => {
  return (
    <div>
      filter shown with
      <input value={newSearch} onChange={handleFilter} />
    </div>
  );
};

const PersonForm = ({
  addNumber,
  newName,
  newNumber,
  handleNewName,
  handleNewNumber,
}) => {
  return (
    <form onSubmit={addNumber}>
      <div>
        name: <input value={newName} onChange={handleNewName} /> <br></br>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ namesToShow }) => {
  return namesToShow.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}{" "}
    </p>
  ));
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const addNumber = (event) => {
    event.preventDefault();
    const newNameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    console.log(newNameObject);

    persons.some((person) => newName === person.name)
      ? alert(`${newName} is already added to the phonebook`)
      : setPersons(persons.concat(newNameObject));

    setNewName("");
    setNewNumber("");
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilter = (event) => {
    setNewSearch(event.target.value);
    console.log(event.target.value);
  };

  const namesToShow =
    newSearch === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newSearch.toLowerCase())
        );
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} handleFilter={handleFilter} />

      <h2>Add a new</h2>

      <PersonForm
        addNumber={addNumber}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} />
    </div>
  );
};

export default App;
