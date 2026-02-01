import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/person";
import Notification from "./components/Notification";
import Error from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      (person) =>
        person.name.toLowerCase() === newNameObject.name.toLowerCase(),
    ); //returns true or false

    if (nameExists) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`,
        )
      ) {
        const person = persons.find(
          (person) =>
            person.name.toLowerCase() === newNameObject.name.toLowerCase(),
        ); //returns the actual person object
        const changedPerson = { ...person, number: newNumber };
        personService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id === person.id ? returnedPerson : p)),
            );

            setNewName("");
            setNewNumber("");

            setMessage(
              `Changed ${changedPerson.name}'s phone number to ${changedPerson.number}`,
            );
            setTimeout(() => setMessage(null), 5000);
          })
          .catch((error) => {
            setErrorMessage(error.response.data.error);
            setTimeout(() => setErrorMessage(null), 5000);
            setPersons(persons.filter((p) => p.id !== person.id));
          });
        return;
      }
      return;
    }

    personService
      .create(newNameObject)
      .then((newPerson) => {
        console.log(newPerson);
        setPersons(persons.concat(newPerson));

        setNewName("");
        setNewNumber("");

        setMessage(
          `Added ${newNameObject.name} Number:${newNameObject.number}`,
        );
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setErrorMessage(error.response.data.error);
        setTimeout(() => setErrorMessage(null), 5000);
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

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);

    if (!window.confirm(`Delete ${person.name}?`)) {
      return;
    }

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id));
        setMessage(`Deleted ${person.name} from the server`);
        setTimeout(() => setMessage(null), 5000);
      })
      .catch(() => {
        alert(`${person.name} is already removed from the server`);
        setPersons(persons.filter((p) => p.id !== id));
      });
  };

  const namesToShow =
    newSearch === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newSearch.toLowerCase()),
        );
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Error message={errorMessage} />
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
      <Persons namesToShow={namesToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
