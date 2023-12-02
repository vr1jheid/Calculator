"use strict"

let buttonArea = document.querySelector(".buttons");
let display = document.querySelector(".display");
/* let str = "3,2"
console.log(+str.replace(",","."));
 */
function calculate(event) {
  if (event.target.tagName !== "BUTTON") return;
  let target = event.target;
  if (!target.dataset.action) {
    display.textContent += target.textContent;
  }
}

buttonArea.addEventListener("click", calculate)