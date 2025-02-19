function add(num1, num2) {
  return parseInt(num1) + parseInt(num2);
}

function subtract(num1, num2) {
  return parseInt(num1) - parseInt(num2);
}

function multiply(num1, num2) {
  return parseInt(num1) * parseInt(num2);
}

function divide(num1, num2) {
  return parseInt(num1) / parseInt(num2);
}

function operate(operator, num1, num2) {
  let result = 0;
  switch (operator) {
    case "/":
      result = divide(num1, num2);
      break;
    case "%":
      result = add(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "+":
      result = add(num1, num2);
      break;
    case "=":
      result = num1;
      break;

    default:
      break;
  }

  return result;
}

function addNumberButton() {
  const arrNumberButton = Array(10)
    .fill()
    .map(function (item, index) {
      return index;
    })
    .reverse();
  arrNumberButton.splice(9, 0, ".");

  const arrButton = arrToDomButton(arrNumberButton, "numButton");

  return arrButton;
}

function arrToDomButton(arr, styleName) {
  let arrButton = [];
  arrButton = arr.map(function (item) {
    const button = document.createElement("button");
    button.innerText = `${item}`;
    button.setAttribute("id", `button${item}`);
    button.setAttribute("value", item);
    button.classList.add(`${styleName}`);

    return button;
  });
  return arrButton;
}

function addOperatorButton() {
  const arrOperator = ["/", "%", "*", "-", "+", "="];
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

function generateCalculator() {
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

function toDisplayNumber(event) {
  const maxInteger = Number.MAX_SAFE_INTEGER / 100000000;
  const displayContainer = document.querySelector(".display-container");

  if (displayContainer.innerText === "0") {
    displayContainer.innerText =
      parseInt(displayContainer.innerText) + parseInt(event.target.value);
  } else if (displayContainer.innerText === "") {
    displayContainer.innerText += event.target.value;
  } else if (parseInt(displayContainer.innerText) < maxInteger) {
    displayContainer.innerText += event.target.value;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  generateCalculator();

  const numberContainer = document.querySelector(".number-container");
  const operatorContainer = document.querySelector(".operator-container");
  const displayContainer = document.querySelector(".display-container");
  let isOperatorButtonClicked = false;
  let value1 = null;
  let value2 = null;

  const arrNumberButton = numberContainer.querySelectorAll("button");
  const arrOperatorButton = operatorContainer.querySelectorAll("button");

  arrNumberButton.forEach(function (number) {
    number.addEventListener("click", function (event) {
      if (!isOperatorButtonClicked) {
        toDisplayNumber(event);
      } else {
        displayContainer.innerText = "";
        toDisplayNumber(event);
        isOperatorButtonClicked = false;
      }
    });
  });

  arrOperatorButton.forEach(function (operator) {
    operator.addEventListener("click", function (event) {
      if (value1 === null) {
        value1 = displayContainer.innerText;
        isOperatorButtonClicked = true;
      } else {
        value2 = displayContainer.innerText;
        isOperatorButtonClicked = true;
        value1 = operate(event.target.value, value1, value2);
        console.log(value1);
      }
    });
  });
});
