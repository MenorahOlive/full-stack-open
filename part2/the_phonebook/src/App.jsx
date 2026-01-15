import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addNumber = (event) => {
    event.preventDefault();

    const newNameObject = {
      name: newName,
      number: newNumber,
    };
    console.log(newNameObject);

    const nameExists = persons.some(
      (person) => person.name.toLowerCase() === newNameObject.name.toLowerCase()
    );

    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    personService.create(newNameObject).then((newPerson) => {
      console.log(newPerson);
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    });
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
