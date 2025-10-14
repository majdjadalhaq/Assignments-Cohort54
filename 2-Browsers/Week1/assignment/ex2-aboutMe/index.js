/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/2-Browsers/Week1#exercise-2-about-me

1. Using JavaScript, replace each of the spans (`nickname`, fav-food`, 
   `hometown`) with your own information.
2. In JavaScript, iterate through each `<li>` and change the class to 
   `list-item`.
3. Look in the css file!
------------------------------------------------------------------------------*/

function main() {
  // Replace spans with your info
  document.getElementById('nickname').textContent = 'Majd';
  document.getElementById('fav-food').textContent = 'Pizza';
  document.getElementById('hometown').textContent = 'palestine';

  // Select all <li> elements and set their class to 'list-item'
  const listItems = document.querySelectorAll('li');
  for (const item of listItems) {
    item.className = 'list-item';
  }
}

window.addEventListener('load', main);