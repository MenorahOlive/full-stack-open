import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addNumber = (event) => {
    event.preventDefault();
    const newNameObject = {
      name: newName,
      number: newNumber,
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNewName} /> <br></br>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
        </p>
      ))}
    </div>
  );
};

export default App;
