/*
Full description at:https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-6-using-the-browser-debugger
*/

/*
Full description at:
https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-6-using-the-browser-debugger

This exercise focuses on learning to debug web-based JavaScript using the browser debugger.
Try placing breakpoints in getData(), renderLaureate(), and fetchAndRender() to inspect
data flow, function calls, and variable values.
*/

async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

function createAndAppend(name, parent, options = {}) {
  const elem = document.createElement(name);
  parent.appendChild(elem);
  Object.entries(options).forEach(([key, value]) => {
    if (key === 'text') {
      elem.textContent = value;
    } else {
      elem.setAttribute(key, value);
    }
  });
  return elem;
}

function addTableRow(table, label, value) {
  const tr = createAndAppend('tr', table);
  createAndAppend('th', tr, { text: label });
  createAndAppend('td', tr, { text: value });
}

function renderLaureate(ul, { knownName, birth, death }) {
  const li = createAndAppend('li', ul);
  const table = createAndAppend('table', li);

  // Name
  addTableRow(table, 'Name', knownName?.en ?? 'Unknown');

  // Birth
  const birthPlace = birth?.place
    ? [
        birth.place.city?.en,
        birth.place.country?.en,
      ]
        .filter(Boolean)
        .join(', ')
    : '';

  const birthInfo = birth
    ? `${birth.date ?? 'Unknown'}${birthPlace ? ', ' + birthPlace : ''}`
    : 'Unknown';
  addTableRow(table, 'Birth', birthInfo);

  // Death
  const deathPlace = death?.place
    ? [
        death.place.city?.en,
        death.place.country?.en,
      ]
        .filter(Boolean)
        .join(', ')
    : '';

  const deathInfo = death
    ? `${death.date ?? 'N/A'}${deathPlace ? ', ' + deathPlace : ''}`
    : 'Still alive';
  addTableRow(table, 'Death', deathInfo);
}

function renderLaureates(laureates) {
  const ul = createAndAppend('ul', document.body);
  laureates.forEach((laureate) => renderLaureate(ul, laureate));
}

async function fetchAndRender() {
  try {
    const data = await getData(
      'https://api.nobelprize.org/2.0/laureates?birthCountry=Netherlands&format=json&csvLang=en'
    );
    renderLaureates(data.laureates);
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
}

window.addEventListener('load', fetchAndRender);