var minRangeInput = document.getElementById("min-range-input");
var maxRangeInput = document.getElementById("max-range-input");
var updateButton = document.querySelector(".update-btn");
var submitBtn = document.querySelector("#submit-btn");
var guess1 = document.querySelector("#chall1-guess-input");
var guess2 = document.querySelector("#chall2-guess-input");
var chall1Name = document.querySelector("#chall1-name-input");
var chall2Name = document.querySelector("#chall2-name-input");
var message1 = document.querySelector(".chall1-high-low");
var message2 = document.querySelector(".chall2-high-low");
var guess1Output = document.querySelector(".chall1-guess-output");
var guess2Output = document.querySelector(".chall2-guess-output");
var clearBtn = document.querySelector("#clear-btn");
var resetBtn = document.querySelector("#reset-btn");
var name1 = document.querySelector(".scoreboard-name1");
var name2 = document.querySelector(".scoreboard-name2");
var min = document.querySelector(".min-output");
var max = document.querySelector(".max-output");
var minErrorElem = document.querySelector(".min-above-max-error");
var maxErrorElem = document.querySelector(".max-below-min-error");
var guessErrorElem1 = document.querySelector(".guess-outside-range-error-1");
var guessErrorElem2 = document.querySelector(".guess-outside-range-error-2");
var nanError1 = document.querySelector(".nan-error1");
var nanError2 = document.querySelector(".nan-error2");
var submitErrorElem = document.querySelector(".submit-error");
var updateErrorElem = document.querySelector(".update-error");
var displayArea = document.querySelector(".display");
var submitInputs = document.querySelectorAll(".submit-inputs");
var inputTest = document.querySelectorAll("input");
var minRange = 1;
var maxRange = 100;
var randomNumber;
var guessCount = 0;

clearBtn.addEventListener("click", clearInputs);
updateButton.addEventListener("click", updateError);
updateButton.addEventListener("click", updateRange);
submitBtn.addEventListener("click", initiateGamePlay);
resetBtn.addEventListener("click", resetGame);
displayArea.addEventListener("click", deleteCard);
chall1Name.addEventListener("keyup", runName1);
chall2Name.addEventListener("keyup", runName2);
guess1.addEventListener("keyup", runGuess1);
guess2.addEventListener("keyup", runGuess2);
minRangeInput.addEventListener("keyup", runMinRange);
maxRangeInput.addEventListener("keyup", runMaxRange);

submitBtn.disabled = true;
clearBtn.disabled = true;
resetBtn.disabled = true;

getRandom(1, 100);

function runName1() {
  validateNames(chall1Name);
  enableClearResetBtn(chall1Name, chall2Name, clearBtn);
  enableClearResetBtn(chall1Name, chall2Name, resetBtn);
  enableSubmitBtn();
}

function runName2() {
  validateNames(chall2Name);
  enableClearResetBtn(chall1Name, chall2Name, clearBtn);
  enableClearResetBtn(chall1Name, chall2Name, resetBtn);
  enableSubmitBtn();
}

function runGuess1() {
  validateNumber(guess1, nanError1);
  enableClearResetBtn(guess1, guess2, resetBtn);
  enableClearResetBtn(guess1, guess2, clearBtn);
  validateGuess(guess1, guessErrorElem1);
  enableSubmitBtn();
}

function runGuess2() {
  validateNumber(guess2, nanError2);
  enableClearResetBtn(guess1, guess2, resetBtn);
  enableClearResetBtn(guess1, guess2, clearBtn);
  validateGuess(guess2, guessErrorElem2);
  enableSubmitBtn();
}

function runMinRange() {
  minAboveMaxError();
  maxBelowMinError();
  removeUpdateError();
}

function runMaxRange() {
  maxBelowMinError();
  minAboveMaxError();
  removeUpdateError();
}

function increaseDifficulty() {
  var parsedMin = parseInt(min.innerText);
  var parsedMax = parseInt(max.innerText);
  var minMinus = parsedMin;
  var maxPlus = parsedMax;
  getRandom(minMinus, maxPlus);
  min.innerText = minMinus;
  max.innerText = maxPlus;
}

function enableSubmitBtn() {
  for (var i = 0; i < submitInputs.length; i++) {
    if (submitInputs[i].value === "") {
      submitBtn.disabled = true;
      return;
    } else {
      submitBtn.disabled = false;
    }
  }
}

function enableClearResetBtn(name1, name2, button) {
  if (name1.value === "" && name2.value === "") {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

function submitError(guess) {
  if (guess.value === "") {
    submitErrorElem.removeAttribute("hidden");
  }
}

function validateGuess(guess, guessErrorElem) {
  var minValue = min.innerText;
  var maxValue = max.innerText;
  var parsedMin = parseInt(minValue);
  var parsedMax = parseInt(maxValue);
  if (guess.value > parsedMax || guess.value < parsedMin) {
    addError(guess);
    guessErrorElem.removeAttribute("hidden");
  }
  if (guess.value >= parsedMin && guess.value <= parsedMax) {
    removeError(guess);
    guessErrorElem.setAttribute("hidden", true);
  }
  if (guess.value.length < 1) {
    removeError(guess);
    guessErrorElem.setAttribute("hidden", true);
  }
}

function updateError(event) {
  event.preventDefault();
  if (minRangeInput.value.length < 1 || maxRangeInput.value.length < 1) {
    updateErrorElem.removeAttribute("hidden");
  } else {
    updateErrorElem.setAttribute("hidden", true);
  }
}

function removeUpdateError() {
  if (minRangeInput.value.length > 0 || maxRangeInput.value.length > 0) {
    updateErrorElem.setAttribute("hidden", true);
  }
}

function updateRange(event) {
  event.preventDefault();
  var newMinRange = parseInt(minRangeInput.value);
  var newMaxRange = parseInt(maxRangeInput.value);
  min.innerText = newMinRange;
  max.innerText = newMaxRange;
  getRandom(newMinRange, newMaxRange);
  minRangeInput.value = "";
  maxRangeInput.value = "";
  resetBtn.disabled = false;
}

function getRandom(min, max) {
  randomNumber = Math.floor(Math.random() * (max - min) + min);
  return randomNumber;
}

function validateNames(challName) {
  var regex = /^[0-9a-zA-Z]+$/;
  if (regex.test(challName.value) !== true) {
    addError(challName);
  } else {
    removeError(challName);
  }
}

function validateNumber(num, error) {
  var numGuess = parseInt(num.value);
  var regex = /^[0-9]+$/;
  if (regex.test(numGuess) !== true) {
    addError(num);
    error.removeAttribute("hidden", false);
  }
  if (num.value === "") {
    error.setAttribute("hidden", true);
    removeError(num);
  }
}

function minAboveMaxError() {
  var newMinRange = parseInt(minRangeInput.value);
  var newMaxRange = parseInt(maxRangeInput.value);
  if (newMinRange >= newMaxRange) {
    addError(minRangeInput);
    minErrorElem.removeAttribute("hidden");
  }
  if (newMinRange < newMaxRange) {
    removeError(minRangeInput);
    minErrorElem.setAttribute("hidden", true);
  }
}

function addError(inputName) {
  inputName.classList.add("error-border");
}

function removeError(inputName) {
  inputName.classList.remove("error-border");
}

function maxBelowMinError() {
  var newMinRange = parseInt(minRangeInput.value);
  var newMaxRange = parseInt(maxRangeInput.value);
  if (newMaxRange <= newMinRange) {
    addError(maxRangeInput);
    maxErrorElem.removeAttribute("hidden");
  }
  if (newMaxRange > newMinRange) {
    removeError(maxRangeInput);
    maxErrorElem.setAttribute("hidden", true);
  }
}

function updateLatestScore() {
  name1.innerText = chall1Name.value;
  name2.innerText = chall2Name.value;
  guess1Output.innerText = guess1.value;
  guess2Output.innerText = guess2.value;
}

function initiateGamePlay(event) {
  event.preventDefault();
  submitError(guess1);
  submitError(guess2);
  updateLatestScore();
  guessCount = guessCount + 2;
  compareGuess(guess1, message1, chall1Name.value);
  compareGuess(guess2, message2, chall2Name.value);
  clearGuesses();
}

function compareGuess(guess, message, name) {
  var guessInt = parseInt(guess.value);
  if (guessInt > randomNumber) {
    message.innerText = "That's too high";
  } else if (guessInt < randomNumber) {
    message.innerText = "That's too low";
  } else if (guessInt === randomNumber) {
    message.innerText = "BOOM!";
    appendCard(name);
    guessCount = 0;
    increaseDifficulty();
  }
}

function appendCard(winnerName) {
  var cardHTML = `
    <article class="winnercard">
        <div class="card-headline">
          <span class="chall1-name-output">${chall1Name.value}</span> vs <span class="chall2-name-output">${chall2Name.value}</span>
        </div>
        <div class="card-winner">
          <h2>${winnerName}</h2>
          <p class="font-light winner-tagline">WINNER</p>
        <div >
          <ul class="card-bottom">
            <li>
              <span class="guess-counter">${guessCount}</span> GUESSES
            </li>
            <li>
              <span class="clock">1</span> MINUTES
            </li>
            <li>
              <button class="remove-card-btn">X</button>
            </li>
          </ul>
        </div>
      </article> `;
  displayArea.insertAdjacentHTML("afterbegin", cardHTML);
}

function deleteCard(event) {
  if (event.target.className === "remove-card-btn") {
    event.target.closest(".winnercard").remove();
  }
}

function generateNewRandomNum() {
  var minValue = min.innerText;
  var maxValue = max.innerText;
  var parsedMin = parseInt(minValue);
  var parsedMax = parseInt(maxValue);
  getRandom(parsedMin, parsedMax);
}

function clearInputs() {
  chall1Name.value = "";
  chall2Name.value = "";
  clearGuesses();
  clearBtn.disabled = true;
}

function clearGuesses() {
  guess1.value = "";
  guess2.value = "";
  submitBtn.disabled = true;
}

function resetScoreBoard(name, guess, message, num) {
  name.innerText = `Challenger ${num} name`;
  guess.innerText = "?";
  message.innerText = "enter a guess";
}

function resetGame(event) {
  event.preventDefault();
  resetScoreBoard(name1, guess1Output, message1, 1);
  resetScoreBoard(name2, guess2Output, message2, 2);
  clearInputs();
  min.innerText = 1;
  max.innerText = 100;
  getRandom(1, 100);
}
