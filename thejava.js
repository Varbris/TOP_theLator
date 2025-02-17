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
    if (i === 1) {
      const button = document.createElement("button");
      button.innerText = `.`;
      button.setAttribute("id", `buttondot`);
      button.classList.add("numButton");
      arrButton.push(button);
    }
  }

  return arrButton;
}

function arrToDomButton(arr, styleName) {
  let arrButton = [];
  arrButton = arr.map(function (item) {
    const button = document.createElement("button");
    button.innerText = `${item}`;
    button.setAttribute("id", `button${item}`);
    button.classList.add(`${styleName}`);
    return button;
  });
  return arrButton;
}

function addOperatorButton() {
  const arrOperator = ["/", "*", "-", "+", "="];
  let arrButton = arrToDomButton(arrOperator, "operatorButton");

  return arrButton;
}

function addfuncButton() {
  const arrFunc = ["C", "M-", "M+"];
  let arrButton = arrToDomButton(arrFunc, "functionButton");

  return arrButton;
}

function appendArrToContainer(arr, container) {
  arr.forEach(function (item) {
    container.appendChild(item);
  });
}

function generateButton() {
  const numberContainer = document.querySelector(".number-container");
  const operatorContainer = document.querySelector(".operator-container");
  const functionContainer = document.querySelector(".function-container");

  const arrNumButton = addNumberButton();
  const arrOperatorButton = addOperatorButton();
  const arrFuncButton = addfuncButton();

  appendArrToContainer(arrNumButton, numberContainer);
  appendArrToContainer(arrOperatorButton, operatorContainer);
  appendArrToContainer(arrFuncButton, functionContainer);
}

generateButton();
