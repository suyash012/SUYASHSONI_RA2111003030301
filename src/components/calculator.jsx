import React, { useState, useEffect } from 'react';
import axios from "axios";

const Calculator = () => {
  const [data, setData] = useState([]);
  const [avg, setAvg] = useState(0);
  const [windowSize, setWindowSize] = useState(10);
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:9876/numbers/e');
      setData(response.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > windowSize) {
      setWindowPrevState(data.slice(0, windowSize));
      setWindowCurrState(data.slice(windowSize));
    }

    if (data.length >= windowSize) {
      const sum = data.slice(0, windowSize).reduce((acc, num) => acc + num, 0);
      setAvg(sum / windowSize);
    }
  }, [data]);

  return (
    <div>
      <h1>Average Calculator</h1>
      <p>Window Previous State: {windowPrevState.join(', ')}</p>
      <p>Window Current State: {windowCurrState.join(', ')}</p>
      <p>Average: {avg}</p>
    </div>
  );
};

export default Calculator;