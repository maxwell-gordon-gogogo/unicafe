import React from 'react';
import { useState } from 'react';
import './style.css';

const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <th>{text}</th>
      <th>{value}</th>
    </tr>
  );
};

const Statistics = ({ statistics }) => {
  const calcPositive = (statistics) => {
    if (statistics[0] === 0 && statistics[1] === 0 && statistics[2] === 0) {
      return 1;
    } else {
      return statistics[0] / statistics.reduce((a, b) => a + b);
    }
  };

  const calcAvg = (statistics) => {
    if (statistics[0] === 0 && statistics[1] === 0 && statistics[2] === 0) {
      return 0;
    } else {
      return (
        (statistics[0] - statistics[2]) / statistics.reduce((a, b) => a + b)
      );
    }
  };

  return (
    <div>
      <table>
        <StatisticLine text="good" value={statistics[0]} />
        <StatisticLine text="neutral" value={statistics[1]} />
        <StatisticLine text="bad" value={statistics[2]} />
        <StatisticLine text="all" value={statistics.reduce((a, b) => a + b)} />
        <StatisticLine text="average" value={calcAvg(statistics).toFixed(2)} />
        <StatisticLine
          text="positive"
          value={(calcPositive(statistics) * 100).toFixed(2) + '%'}
        />
      </table>
    </div>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [statistics, setStatistics] = useState([0, 0, 0]);

  const noFeedback = (statistics) => {
    return statistics[0] === 0 && statistics[1] === 0 && statistics[2] === 0;
  };

  const handleChoice = (choice) => {
    switch (choice) {
      case 'good':
        return () => {
          setStatistics([statistics[0] + 1, statistics[1], statistics[2]]);
        };
      case 'neutral':
        return () => {
          setStatistics([statistics[0], statistics[1] + 1, statistics[2]]);
        };
      case 'bad':
        return () => {
          setStatistics([statistics[0], statistics[1], statistics[2] + 1]);
        };
    }
  };

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button handleClick={handleChoice('good')} text="good" />
        <Button handleClick={handleChoice('neutral')} text="neutral" />
        <Button handleClick={handleChoice('bad')} text="bad" />
      </div>
      <h2>statistics</h2>
      {noFeedback(statistics) ? (
        <p>No feedback given</p>
      ) : (
        <Statistics statistics={statistics} />
      )}
    </div>
  );
};

export default App;
