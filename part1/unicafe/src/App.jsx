import { useState } from "react";

const Heading = ({ title }) => (
  <h1>
    <strong>{title}</strong>
  </h1>
);

const Button = ({ onClick, title }) => (
  <button onClick={onClick}>{title}</button>
);

const Statistic = ({ rating, value }) => (
  <p>
    {rating} {value}
  </p>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClicks = () => setGood(good + 1);
  const handleNeutralClicks = () => setNeutral(neutral + 1);
  const handleBadClicks = () => setBad(bad + 1);

  return (
    <div>
      <Heading title="give feedback" />
      <Button onClick={handleGoodClicks} title="good" />
      <Button onClick={handleNeutralClicks} title="neutral" />
      <Button onClick={handleBadClicks} title="bad" />

      <Heading title="statistics" />
      <Statistic rating="good" value={good} />
      <Statistic rating="neutral" value={neutral} />
      <Statistic rating="bad" value={bad} />
    </div>
  );
};

export default App;
