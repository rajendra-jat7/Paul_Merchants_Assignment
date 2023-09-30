import React, { useEffect, useState } from 'react';
import './MultiThreadedTask.css'; // Import your custom CSS

const MultiThreadedTask = () => {
  const [worker1, setWorker1] = useState(null);
  const [worker2, setWorker2] = useState(null);
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');

  const startTask = (worker, setMessage) => {
    if (worker) {
      worker.postMessage('start');
      setMessage('Task started.');
    }
  };

  const stopTask = (worker, setMessage) => {
    if (worker) {
      worker.postMessage('stop');
      setMessage('Task stopped.');
    }
  };

  useEffect(() => {
    const newWorker1 = new Worker('worker.js');
    const newWorker2 = new Worker('worker.js');

    newWorker1.onmessage = (e) => {
      console.log('Received 1:', e.data);
      setMessage1(`Received 1: ${e.data}`);
    };

    newWorker2.onmessage = (e) => {
      console.log('Received 2:', e.data);
      setMessage2(`Received 2: ${e.data}`);
    };

    setWorker1(newWorker1);
    setWorker2(newWorker2);

    return () => {
      if (newWorker1) {
        newWorker1.terminate();
      }
      if (newWorker2) {
        newWorker2.terminate();
      }
    };
  }, []);

  return (
    <div className="multithread-container">
      <h1>Multi-Threaded Task</h1>
      <div className="buttons-container">
        <button onClick={() => startTask(worker1, setMessage1)}>Start Task 1</button>
        <button className="stop" onClick={() => stopTask(worker1, setMessage1)}>Stop Task 1</button>
        <button onClick={() => startTask(worker2, setMessage2)}>Start Task 2</button>
        <button className="stop" onClick={() => stopTask(worker2, setMessage2)}>Stop Task 2</button>
      </div>
      <div className="messages-container">
        <p>{message1}</p>
        <p>{message2}</p>
      </div>
    </div>
  );
};

export default MultiThreadedTask;
