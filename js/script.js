"use strict"

let buttonArea = document.querySelector(".buttons");
let display = document.querySelector(".display");
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
}

buttonArea.addEventListener("click", calculate)