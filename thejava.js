function add(num) {}

function subtract(num) {}

function multiply(num) {}

function divide(num) {}

function operate(operator, num1, num2) {}

function addNumberButton() {
  const button = document.createElement("button");
  let arrButton = [];
  for (let i = 0; i <= 9; i++) {
    arrButton.push(button);
    button.innerText = `${i}`;
  }
  return arrButton;
}
