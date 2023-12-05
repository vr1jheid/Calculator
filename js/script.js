"use strict"

const buttonArea = document.querySelector(".buttons");
const display = document.querySelector(".display");

let currentValue = 0;
let prevValue = 0;
let prevButton;
let superSmallNum = 0.0000000000001;
let comma = {
  status: false,
  multi: 0.1,
  counter: 0,
  reset(){
    this.status = false;
    this.multi = 0.1;
    this.counter = 0;
  }
};
let operator = {
  type: null,
  button: null,
}

function show(data) {
  display.textContent = data.toString().replace(".", ",");
}


function calculator(event) {

  function applyOperator(operator) {
    switch (operator) {
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
        currentValue = prevValue - currentValue;
        show(currentValue);
        break;
      default:
        break;
    }
  }

  function applyEditor(editor) {
    switch (editor) {
      case "clear":
        if (prevButton?.dataset.edit === "clear") {
          prevValue = 0
        }
        operator.button.classList.add("orange-active");
        currentValue = 0;
        show(currentValue);
        break;

      case "plus-minus":
        currentValue *= -1;
        show(currentValue);
        break;

      case "percent":
        if (!prevValue) {
          currentValue *= 0.01
        }
        else{
          currentValue *= 0.01*prevValue;
        }
        show(currentValue);
        break;
        case "comma":
          comma.status = true;
          show(currentValue + ",")
          break;
    
      default:
        break;
    }
  }

  let target = event.target;
  if (target.tagName !== "BUTTON") return;
  if (display.textContent.length > 8) return;
  if (operator.button) operator.button.classList.remove("orange-active");
  
  // Number
  if (target.value){
    console.log(comma.status);
    if (!comma.status) {
      currentValue = currentValue*10 + Number(target.value);
      show(currentValue);
    }
    else{
      comma.counter++;
      currentValue = (currentValue + Number(target.value)*comma.multi + superSmallNum).toFixed(comma.counter);
      show(currentValue);
      currentValue = +currentValue;
      comma.multi *= 0.1;
    }

  }

  if (target.dataset.edit) {
    applyEditor(target.dataset.edit)
  }


  // Operator
  if (target.dataset.operator) {
    comma.reset();
    console.log(comma);
    if (target.dataset.operator !== "equal") target.classList.add("orange-active");
    
    if (prevButton?.dataset.operator) {
      operator.type = target.dataset.operator;
      operator.button = target;
    }
    else{
      applyOperator(operator.type);
      operator.type = target.dataset.operator;
      operator.button = target;
      prevValue = currentValue;
      currentValue = 0;
    }
  }

  prevButton = target;
}

buttonArea.addEventListener("click", calculator);