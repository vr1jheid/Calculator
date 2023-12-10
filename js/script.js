"use strict"

const buttonArea = document.querySelector(".buttons");
const display = document.querySelector(".display");
let currentValue = 0;
let prevValue = 0;
let prevButton;
const superSmallNum = 1e-9;
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


function show(value) {
  let result = value;
  let isInt = result % 1 === 0;
  let beforeDotLength = Math.round(result).toString().replace("-","").length;
  let afterDotLength = 0;

  console.log(result);
  if (result.toString().includes("e")) {
    let strResult = result.toString();
    display.textContent = strResult.slice(0, beforeDotLength) + strResult.slice(strResult.indexOf("e"));
    return;
  }

  if (!isInt) {
    afterDotLength = result.toString().length - beforeDotLength - 1;
  }

  if (comma.status && currentValue === 0 ) {
    if (comma.counter > 6) return;
    display.textContent = currentValue + "," + "0".repeat(comma.counter);
    return;
  }


  if (result > 1e9-1 || result < -1e9+1) {
    result = result/Number(("1" + "0".repeat(beforeDotLength - 1)))
    result = Number(result.toFixed(5));
    result = result + `e${beforeDotLength - 1}`
  }

  if (result < 1e8-1 && !isInt) {
    result = Number(result.toFixed(9 - beforeDotLength - 1))
  }

  display.textContent = result.toString().replace(".", ",");
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
        currentValue = prevValue/currentValue;
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
      case "fullClear":
        break;

      case "clear":
        if (prevButton?.dataset.edit === "clear") {
          operator.button?.classList.remove("orange-active");
          prevValue = 0
          break;
        }
        comma.reset();
        if (operator.type !== "equal") operator.button?.classList.add("orange-active");
        currentValue = 0;
        show(currentValue);
        break;

      case "plus-minus":
        currentValue *= -1;
        show(currentValue);
        break;

      case "percent":
        if (!prevValue) {
          currentValue *= 0.01;
        }
        else{
          currentValue *= 0.01*prevValue;
        }
        show(currentValue);
        break;

      case "comma":
        if ((currentValue > 1e8-1)) break;
        comma.status = true;
        display.textContent = currentValue + ",";
        break;
    
      default:
        break;
    }
  }

  let target = event.target;
  if (target.tagName !== "BUTTON") return;
  if (operator.button) operator.button.classList.remove("orange-active");

  // Number
  if (target.value){
    if (prevButton?.dataset.operator)  currentValue = 0;
    if (currentValue > 1e8-1 || currentValue < -1e8+1) return;
    // Ввод числа
    if (!comma.status) {
      currentValue = currentValue*10 + Number(target.value);
      show(currentValue);
    }
    else{
      comma.counter++;
      currentValue = currentValue + Number(target.value)*comma.multi;
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
    }
  }
  //console.log(`currentValue = ${currentValue} | prevValue = ${prevValue}`);
  prevButton = target;
}

buttonArea.addEventListener("click", calculator);