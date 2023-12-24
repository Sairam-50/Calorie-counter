const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");

const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");

let isError = false;

// Even though you set an input element to be a number, JavaScript receives a string value. You need to write a function to clean the string value and ensure you have a number.

function cleanInputString(str) {
  //   const strArray = str.split("");
  //   const cleanStrArray = []; //  You will use this to store your valid number characters.
  //   for (let i = 0; i < strArray.length; i++) {
  //     if (!["+", "-", " "].includes(strArray[i])) {
  //       cleanStrArray.push(strArray[i]);
  //     }
  //   }

  // Better way:
  const regex = /[+-\s]/;

  // Note that you need to use the \ to escape the +, because a + has a special meaning in regular expressions.
  // \s matches whitespaces

  // Note that you no longer need to escape the + character, because you are using a character class.

  //   Regex can also take specific flags to alter the pattern matching behavior. Flags are added after the closing /. The g flag, which stands for "global", will tell the pattern to continue looking after it has found a match. Here is an example:
  return str.replace(regex, "");
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i; // i flag makes the exp case-insensitive
  return str.match(regex);
}

// This is to allow users to add entries
function addEntry() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );

  const entryNumber = targetInputContainer.querySelectorAll();
}
