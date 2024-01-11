// In regex, shorthand character classes allow you to match specific characters without having to write those characters in your pattern. Shorthand character classes are preceded with a backslash (\)

// Note that you need to use the \ to escape the +, because a + has a special meaning in regular expressions.

// \s matches whitespaces

// To tell the pattern to match each of these characters individually, you need to turn them into a character class. This is done by wrapping the characters you want to match in brackets.

// Note that you no longer need to escape the + character, because you are using a character class.

//   Regex can also take specific flags to alter the pattern matching behavior. Flags are added after the closing /. The g flag, which stands for "global", will tell the pattern to continue looking after it has found a match.

// In HTML, number inputs allow for exponential notation (such as 1e10). You need to filter those out.
// i flag makes the exp case-insensitive

// This is to allow users to add entries

// This is like id.class to select one particular field. but that id needs to come from the user input.

// so this is like breakfast.input-container and you will be able to add value to that field after the user has selected breakfast from the dropdown.

// You will want to number the entries a user adds. To get all of the number inputs, you can use the querySelectorAll() method.

//   Each entry will have a text input for the entry's name, and a number input for the calories. To get a count of the number of entries, you can query by text inputs. Note that you cannot query by number inputs, as you have an extra number input for the user's calorie budget.
//

// beforeend is the position where you want to add the HTMLString as the last child of the targetInputContainer

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

  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

function addEntry() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`;
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

//You will be attaching the below function to the submit event of the form. The submit event is triggered when the form is submitted. The default action of the submit event is to reload the page. You need to prevent this default action using the preventDefault() method of your e parameter.

function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  const breakfastNumberInputs = document.querySelectorAll(
    "#breakfast input[type=number]"
  );
  const lunchNumberInputs = document.querySelectorAll(
    "#lunch input[type=number]"
  );
  const dinnerNumberInputs = document.querySelectorAll(
    "#dinner input[type=number]"
  );
  const snacksNumberInputs = document.querySelectorAll(
    "#snacks input[type=number]"
  );
  const exerciseNumberInputs = document.querySelectorAll(
    "#exercise input[type=number]"
  );

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  const consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories =
    budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories >= 0 ? "Surplus" : "Deficit";
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
    remainingCalories
  )} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove("hide");
}

function getCaloriesFromInputs(list) {
  let calories = 0;

  for (let i = 0; i < list.length; i++) {
    const currVal = cleanInputString(list[i].value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

function clearForm() {
  const inputContainers = Array.from(
    document.querySelectorAll(".input-container")
  );

  // Remember that document.querySelectorAll returns a NodeList, which is array-like but is not an array.
  // However, the Array object has a .from() method that accepts an array-like and returns an array. This is helpful when you want access to more robust array methods

  for (let i = 0; i < inputContainers.length; i++) {
    inputContainers[i].innerHTML = "";
  }

  budgetNumberInput.value = "";
  output.innerText = "";
  output.classList.add("hide");
  // The difference between innerText and innerHTML is that innerText will not render HTML elements, but will display the tags and content as raw text.
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);