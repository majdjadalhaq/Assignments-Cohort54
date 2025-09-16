/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/2-Browsers/Week1#exercise-4-whats-the-time

1. Inside the `index.js`, complete the `addCurrentTime` to add the current time 
  to the webpage. Make sure it's written in the HH:MM:SS notation (hour, minute,
  second). Use `setInterval()` to make sure the time stays current.
2. Have the function execute when it's loading in the browser.
------------------------------------------------------------------------------*/
function addCurrentTime() {
  // Create or select a container for the time
  let timeContainer = document.getElementById('time');
  if (!timeContainer) {
    timeContainer = document.createElement('h1');
    timeContainer.id = 'time';
    document.body.appendChild(timeContainer);
  }

  // Function to update the time
  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeContainer.textContent = `${hours}:${minutes}:${seconds}`;
  }

  // Update immediately and then every second
  updateTime();
  setInterval(updateTime, 1000);
}

// Execute when the browser has loaded
window.addEventListener('load', addCurrentTime);
