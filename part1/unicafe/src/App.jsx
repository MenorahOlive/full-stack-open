import { useState } from "react";

const Heading = ({ title }) => (
  <h1>
    <strong>{title}</strong>
  </h1>
);

const Button = ({ onClick, title }) => (
  <button onClick={onClick}>{title}</button>
);
const Statistics = ({ children }) => (
  <table>
    <tbody>{children}</tbody>
  </table>
);

const StatisticsLine = ({ type, value }) => (
  <tr>
    <td>{type}</td>
    <td>{value}</td>
  </tr>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const handleGoodClicks = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    const updatedTotal = updatedGood + neutral + bad;
    setTotal(updatedTotal);
    const calculateAverage = (updatedGood - bad) / updatedTotal;
    setAverage(calculateAverage);
    const calculatePercentage = (updatedGood / updatedTotal) * 100;
    setPercentage(calculatePercentage);
  };
  const handleNeutralClicks = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    const updatedTotal = good + updatedNeutral + bad;
    setTotal(updatedTotal);
    const calculateAverage = (good - bad) / updatedTotal;
    setAverage(calculateAverage);
    const calculatePercentage = (good / updatedTotal) * 100;
    setPercentage(calculatePercentage);
  };
  const handleBadClicks = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    const updatedTotal = good + neutral + updatedBad;
    setTotal(updatedTotal);
    const calculateAverage = (good - updatedBad) / updatedTotal;
    setAverage(calculateAverage);
    const calculatePercentage = (good / updatedTotal) * 100;
    setPercentage(calculatePercentage);
  };

  return (
    <div>
      <Heading title="give feedback" />
      <Button onClick={handleGoodClicks} title="good" />
      <Button onClick={handleNeutralClicks} title="neutral" />
      <Button onClick={handleBadClicks} title="bad" />

      <Heading title="statistics" />

      {total === 0 ? (
        <div>No feedback given</div>
      ) : (
        <>
          <Statistics>
            <StatisticsLine type="good" value={good} />
            <StatisticsLine type="neutral" value={neutral} />
            <StatisticsLine type="bad" value={bad} />
            <StatisticsLine type="all" value={total} />
            <StatisticsLine type="average" value={average} />
            <StatisticsLine type="positive" value={percentage} />
          </Statistics>
        </>
      )}
    </div>
  );
};

export default App;
