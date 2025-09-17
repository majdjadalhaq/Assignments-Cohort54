/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/2-Browsers/Week1#exercise-5-the-cat-walk

1. Create a variable to store a reference to the `<img>` element.
2. Change the style of the `<img>` to have a `left` of `0px`, so that it starts 
   at the left hand of the screen.
3. Complete the function called catWalk() to move the cat 10 pixels to the right
   of where it started, by changing the `left` style property.
4. Call that function every 50 milliseconds. Your cat should now be moving 
   across the screen from left to right. Hurrah!
5. When the cat reaches the right-hand of the screen, restart them at the left 
   hand side (`0px`). So they should keep walking from left to right across the 
   screen, forever and ever.
6. When the cat reaches the middle of the screen, replace the img with an image 
   of a cat dancing (use this URL given below), keep it dancing for 5 seconds, 
   and then replace the img with the original image and have it 
   continue the walk.

   Dancing cat URL:

   https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif
-----------------------------------------------------------------------------*/
function catWalk() {
  const cat = document.querySelector('img');
  const originalCatSrc = cat.src;
  const dancingCatSrc =
    'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

  cat.style.position = 'absolute';
  cat.style.left = '0px';

  let walkInterval;
  let hasDanced = false; // Flag to track if cat already danced in this crossing

  function walk() {
    let currentLeft = parseInt(cat.style.left, 10);
    const windowWidth = window.innerWidth;
    const catWidth = cat.width;

    // Move the cat
    cat.style.left = currentLeft + 10 + 'px';

    // Reset to left side when reaching right edge
    if (currentLeft > windowWidth) {
      cat.style.left = '0px';
      hasDanced = false; // Reset dance flag for next crossing
      return;
    }

    // Middle of the screen: trigger dance only if not danced yet
    const middleStart = windowWidth / 2 - catWidth / 2;
    const middleEnd = windowWidth / 2 + catWidth / 2;

    if (!hasDanced && currentLeft >= middleStart && currentLeft <= middleEnd) {
      hasDanced = true; // Mark that cat has danced
      clearInterval(walkInterval);
      cat.src = dancingCatSrc;

      setTimeout(() => {
        cat.src = originalCatSrc;
        walkInterval = setInterval(walk, 50);
      }, 5000);
    }
  }

  walkInterval = setInterval(walk, 50);
}

window.addEventListener('load', catWalk);
