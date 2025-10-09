/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/3-UsingAPIs/Week1#exercise-3-roll-a-die

- Run the unmodified program and confirm that problem described occurs.
- Refactor the `rollDie()` function from callback-based to returning a
  promise.
- Change the calls to `callback()` to calls to `resolve()` and `reject()`.
- Refactor the code that call `rollDie()` to use the promise it returns.
- Does the problem described above still occur? If not, what would be your
  explanation? Add your answer as a comment to be bottom of the file.
------------------------------------------------------------------------------*/

export function rollDie() { 
 return new Promise((resolve, reject) => {

  // Compute a random number of rolls (3-10) that the die MUST complete
  const randomRollsToDo = Math.floor(Math.random() * 8) + 3;
  console.log(`Die scheduled for ${randomRollsToDo} rolls...`);

  const rollOnce = (roll) => {
    // Compute a random die value for the current roll
    const value = Math.floor(Math.random() * 6) + 1;
    console.log(`Die value is now: ${value}`);

    // Use callback to notify that the die rolled off the table after 6 rolls
    if (roll > 6) {
      reject(new Error('Oops... Die rolled off the table.'));
      return;
    }

    // Use callback to communicate the final die value once finished rolling
    if (roll === randomRollsToDo) {
     resolve(value);
        return; 
    }

    // Schedule the next roll todo until no more rolls to do
   if (roll < randomRollsToDo) {
      setTimeout(() => rollOnce(roll + 1), 500);
    }
  };

  // Start the initial roll
  rollOnce(1);
  });
}

function main() {
  rollDie()
    .then(value => console.log(`Success! Die settled on ${value}.`))
    .catch(error => console.log(error.message));
}

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}

/*Explanation:

Before, using callbacks caused a problem because when the die rolled off the table or finished rolling, the messages could happen in a random order

Now, using a Promise

1. We call `resolve()` when the die finishes rolling successfully.  
2. We call `reject()` if the die rolls off the table (more than 6 rolls)

Promises make sure only one thing happens: either success or error. We can handle it easily with `.then()` for success and `.catch()` for errors.  

Because of this, the previous problem does not happen anymore, and everything runs in a clear  predictable order */