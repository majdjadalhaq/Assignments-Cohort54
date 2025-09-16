/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/2-Browsers/Week1#exercise-2-about-me

1. Using JavaScript, replace each of the spans (`nickname`, fav-food`, 
   `hometown`) with your own information.
2. In JavaScript, iterate through each `<li>` and change the class to 
   `list-item`.
3. Look in the css file!
------------------------------------------------------------------------------*/

// 1. Replace span contents with your info
document.getElementById('nickname').textContent = 'Majd';
document.getElementById('fav-food').textContent = 'Pizza';
document.getElementById('hometown').textContent = 'Lelystad';

// 2. Iterate through each <li> and change the class to 'list-item'
const listItems = document.querySelectorAll('ul li');
listItems.forEach((li) => {
  li.className = 'list-item';
});
