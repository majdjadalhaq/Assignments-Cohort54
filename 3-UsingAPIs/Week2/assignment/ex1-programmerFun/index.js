/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-1-programmer-fun

1. Complete the function `requestData()` using `fetch()` to make a request to 
   the url passed to it as an argument. The function should return a promise. 
   Make sure that the promise is rejected in case of HTTP or network errors.
2. Notice that the function `main()` calls `requestData()`, passing it the url 
   `https://xkcd.now.sh/?comic=latest`. Try and run the code in the browser and 
   open the browser's console to inspect the data returned from the request.
3. Next, complete the function `renderImage()` to render an image as an `<img>` 
   element appended to the document's body, using the data returned from the API.
4. Complete the function `renderError()` to render any errors as an `<h1>` 
   element appended to the document's body.
5. Refactor the `main()` function to use `async/await`.
6. Test error handling, for instance, by temporarily changing the `.sh` in the 
   url with `.shx`. There is no server at the modified url, therefore this 
   should result in a network (DNS) error.
------------------------------------------------------------------------------*/
function requestData(url) {
  try {
    const response = await fetch(url);

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // Network or parsing error
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

function renderImage(data) {
 // Create an image element
  const img = document.createElement('img');
  img.src = data.img; // The xkcd API returns `img` as the image URL
  img.alt = data.alt; // Alt text is included in the API
  img.style.maxWidth = '90%';
  img.style.display = 'block';
  img.style.margin = '40px auto';
  img.style.borderRadius = '12px';
  img.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';

  // Add title
  const title = document.createElement('h2');
  title.textContent = data.title;
  title.style.textAlign = 'center';
  title.style.fontFamily = 'sans-serif';

  // Append both to the document body
  document.body.appendChild(title);
  document.body.appendChild(img);
  console.log(data);
}

function renderError(error) {
  // Create an error message element
  const errorMessage = document.createElement('h1');
  errorMessage.textContent = `⚠️ ${error.message}`;
  errorMessage.style.color = 'red';
  errorMessage.style.textAlign = 'center';
  errorMessage.style.marginTop = '50px';
  errorMessage.style.fontFamily = 'sans-serif';

  document.body.appendChild(errorMessage);
  console.log(error);
}

async function main() {
  const url = 'https://xkcd.now.sh/?comic=latest';

  try {
    const data = await requestData(url);
    renderImage(data);
  } catch (error) {
    renderError(error);
  }
}

window.addEventListener('load', main);