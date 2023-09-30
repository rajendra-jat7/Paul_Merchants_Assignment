import React, { useEffect, useState } from 'react';

const MultiThreadedTask = () => {
  const [worker, setWorker] = useState(null);
  const [message, setMessage] = useState('');

  const startTask = () => {
    if (worker) {
      worker.postMessage('start');
      setMessage('Task started.');
    }
  };

  const stopTask = () => {
    if (worker) {
      worker.postMessage('stop');
      setMessage('Task stopped.');
    }
  };

  useEffect(() => {
    const newWorker = new Worker('worker.js');

    newWorker.onmessage = (e) => {
      console.log('Received:', e.data);
      setMessage(`Received: ${e.data}`);
    };

    setWorker(newWorker);

    return () => {
      if (newWorker) {
        newWorker.terminate();
      }
    };
  }, []);

  return (
    <div>
      <h1>Multi-Threaded Task</h1>
      <button onClick={startTask}>Start</button>
      <button onClick={stopTask}>Stop</button>
      <p>{message}</p>
    </div>
  );
};

export default MultiThreadedTask;
