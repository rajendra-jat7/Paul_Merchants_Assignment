// worker.js

let interval;

onmessage = (e) => {
  if (e.data === 'start') {
    // Start the background task
    startTask();
  } else if (e.data === 'stop') {
    // Stop the background task
    stopTask();
  }
};

function startTask() {
  let counter = 0;
  interval = setInterval(() => {
    postMessage(counter);
    counter++;
  }, 1000);
}

function stopTask() {
  clearInterval(interval);
}
