/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/2-Browsers/Week1#exercise-3-the-logo-hijack

1. Find out how to select the element that contains the Google logo, and store 
   it in a variable.
2. Modify the `src` and `srcset` of the logo so that it's replaced by the 
   HackYourFuture logo instead.
------------------------------------------------------------------------------*/
function hijackGoogleLogo() {
  // 1. Select the Google logo
  // On the Google homepage, the logo has an id of "hplogo" or class "lnXdpd"
  // We'll try using the most reliable: 'img' inside '#hplogo' or querySelector
  const logo = document.querySelector('img');

  if (logo) {
    // 2. Replace the src and srcset with HackYourFuture logo
    logo.src = 'assets/hyf-logo-black-bg-small.png';
    logo.srcset = '';
  } else {
    console.log('Google logo not found!');
  }
}

// Execute
hijackGoogleLogo();
