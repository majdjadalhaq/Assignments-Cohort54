/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

async function fetchAndPopulatePokemons(selectEl) {
  const data = await fetchData('https://pokeapi.co/api/v2/pokemon?limit=150');
  if (!data) return;

  data.results.forEach((pokemon) => {
    const option = document.createElement('option');
    option.value = pokemon.url; // Store the API URL for each Pokémon
    option.textContent = pokemon.name;
    selectEl.appendChild(option);
  });
}

async function fetchImage(pokemonUrl, imgEl) {
  if (!pokemonUrl) {
    imgEl.hidden = true;
    return;
  }

  const data = await fetchData(pokemonUrl);
  if (data && data.sprites && data.sprites.front_default) {
    imgEl.src = data.sprites.front_default;
    imgEl.alt = data.name;
    imgEl.hidden = false;
  } else {
    imgEl.hidden = true;
  }
}

async function main() {
  // Create elements dynamically
  const container = document.createElement('div');
  container.classList.add('container');

  const title = document.createElement('h1');
  title.textContent = 'Pokémon Browser';

  const select = document.createElement('select');
  const defaultOption = document.createElement('option');
  defaultOption.textContent = 'Select a Pokémon';
  defaultOption.value = '';
  select.appendChild(defaultOption);

  const img = document.createElement('img');
  img.id = 'pokemon-image';
  img.hidden = true;

  // Add elements to the DOM
  container.append(title, select, img);
  document.body.appendChild(container);

  // Populate dropdown
  await fetchAndPopulatePokemons(select);

  // Add event listener
  select.addEventListener('change', async (event) => {
    const pokemonUrl = event.target.value;
    await fetchImage(pokemonUrl, img);
  });
}

// Run when page is loaded
window.addEventListener('load', main);