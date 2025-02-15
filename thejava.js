function add(num) {}

function subtract(num) {}

function multiply(num) {}

function divide(num) {}

function operate(operator, num1, num2) {}

function addNumberButton() {
  let arrButton = [];
  for (let i = 9; i >= 0; i--) {
    const button = document.createElement("button");
    button.innerText = `${i}`;
    button.setAttribute("id", `button${i}`);
    button.classList.add("numButton");
    arrButton.push(button);
  }
  return arrButton;
}
function addOperatorButton() {
  const arrOperator = ["/", "*", "-", "+", "="];
  let arrButton = [];
  for (let i = 0; i < arrOperator.length; i++) {
    const button = document.createElement("button");
    button.innerText = `${arrOperator[i]}`;
    button.setAttribute("id", `button${arrOperator[i]}`);
    button.classList.add("operatorButton");
    arrButton.push(button);
  }
  return arrButton;
}

function generateButton() {
  const numberContainer = document.querySelector(".number-container");
  const operatorContainer = document.querySelector(".operator-container");
  const arrNumButton = addNumberButton();
  const arrOperatorButton = addOperatorButton();
  arrNumButton.forEach(function (item) {
    numberContainer.appendChild(item);
  });
  arrOperatorButton.forEach(function (item) {
    operatorContainer.appendChild(item);
  });
}

generateButton();
