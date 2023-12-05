"use strict"

let buttonArea = document.querySelector(".buttons");
let display = document.querySelector(".display");
<<<<<<< Updated upstream
let n = 1;
let result = 0;



function calculate(event) {
  
  function toText(number) {
    return number.toString().replace(".", ",");
  }
  function toNumber(text) {
    console.log(text);
  return +text.replace(",", ".");
}

  if (event.target.tagName !== "BUTTON") return;

  let target = event.target;
  let displayText = display.textContent;
  let numOfNums = display.textContent.length;

  if (!target.dataset.action && numOfNums < 9) {
    displayText = toText( toNumber(displayText)*n + toNumber(target.textContent) )
    n = 10;
    display.textContent = displayText;
    return;
  }

  switch (target.dataset.action) {

    case "clear":
      displayText = "0";
      break;

    case "plus-minus":
      /* (-1*+display.textContent).toString() */
      displayText = displayText[0] === "-"? displayText.slice(1): displayText ="-"+displayText;
      break;

    case "percent":
      displayText = toText( toNumber(displayText) * 0.01 );
      break;

    case "comma":
      if (displayText[numOfNums - 1] === ",") break
      displayText += ",";
      break;

    case "sum":
      displayText = result + toNumber(displayText);
      result = toNumber(displayText);
      target.classList.toggle("orange-active");
      console.log(result);
      break;

    default:
      break;
  }
  display.textContent = displayText;
=======
let currentValue = 0;
let prevValue = 0;
let prevButton;
let cache = {
  action: null,
  prevValue: null,
  currentValue: null,
};
let action = {
  type: null,
  button: null,
}

function show(number) {
  display.textContent = number.toString();
}

function subtract(a, b) {
  return a - b;
}

function doAction(action, a, b) {
  switch (action) {
    case "sum":
      currentValue += prevValue;
      show(currentValue);
      break;
    case "multiply":
      currentValue *= prevValue;
      show(currentValue);
      break;
    case "divide":
      currentValue = Number((prevValue/currentValue).toFixed(8));
      show(currentValue);
      break;
    case "subtract":
      //currentValue = prevValue - currentValue;
      subtract(a, b)
      show(currentValue);
      break;
    default:
      break;
  }
}


function calculator(event) {
  let target = event.target;
  if (target.tagName !== "BUTTON") return;

  if (prevButton?.dataset.operator) prevButton.classList.remove("orange-active");

  if (target.value){
    currentValue = currentValue*10 + Number(target.value);
    show(currentValue);
  }

  if (target.dataset.operator) {
    target.classList.add("orange-active");
    if (prevButton?.dataset.operator) {
      action.type = target.dataset.operator;
      action.button = target;
    }
    else{
      doAction(action.type);
      action.type = target.dataset.operator;
      action.button = target;
      prevValue = currentValue;
      currentValue = 0;
    }
  }

  if (target.dataset.equal) {
    if (action.type) {
      cache.currentValue = currentValue;
      cache.action = action.type;
      doAction(action.type);
      prevValue = cache.currentValue;
      action.type = null;
    }
    else {
      doAction(cache.action);
    }


  }

  console.log(`current =${currentValue}||previous =${prevValue}`);
  prevButton = target;
>>>>>>> Stashed changes
}

buttonArea.addEventListener("click", calculator);