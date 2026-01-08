const Course = ({ course }) => {
  return (
    <>
      {course.map((c) => (
        <div key={c.id}>
          <Header course={c.name} />
          <Content parts={c.parts} />
          <Total parts={c.parts} />
        </div>
      ))}
    </>
  );
};
const Header = ({ course }) => {
  return (
    <div>
      <h2>{course}</h2>
    </div>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <p>
        <strong>Total of {totalExercises} exercises</strong>
      </p>
    </div>
  );
};

export default Course;
