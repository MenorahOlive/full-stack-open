const Persons = ({ namesToShow, handleDelete }) => {
  return namesToShow.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </p>
  ));
};

export default Persons;
