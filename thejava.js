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
      result = result;
      break;
    default:
      break;
  }

  return result;
}

function operateFunction(funcButton) {
  const displayContainer = document.querySelector(".display-container");

  switch (funcButton.target.value) {
    case "C":
      displayContainer.innerText = 0;

      break;
    case "M-":
      displayContainer.innerText = -Math.abs(displayContainer.innerText);
      break;
    case "M+":
      displayContainer.innerText = Math.abs(displayContainer.innerText);
      break;
    case ".":
      displayContainer.innerText += ".";
      break;

    default:
      break;
  }
}

function addNumberButton() {
  const arrNumberButton = Array(10)
    .fill()
    .map(function (item, index) {
      return index;
    })
    .reverse();

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
  const arrFunc = ["C", "M-", "M+", "."];
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
  let isOperatorButtonClicked = false;
  let operatorChar = null;
  let value1 = 0;
  let value2 = null;
  const numberContainer = document.querySelector(".number-container");
  const operatorContainer = document.querySelector(".operator-container");
  const functionContainer = document.querySelector(".function-container");
  const displayContainer = document.querySelector(".display-container");
  displayContainer.innerText = value1;

  const arrNumberButton = numberContainer.querySelectorAll("button");
  const arrOperatorButton = operatorContainer.querySelectorAll("button");
  const functionButton = functionContainer.querySelectorAll("button");

  functionButton.forEach(function (funcButton) {
    funcButton.addEventListener("click", function (event) {
      operateFunction(event);
    });
  });

  arrNumberButton.forEach(function (number) {
    number.addEventListener("click", function (event) {
      if (isOperatorButtonClicked) {
        displayContainer.innerText = "";
        toDisplayNumber(event);
        value2 = displayContainer.innerText;
        value1 = operate(operatorChar, value1, value2);
        isOperatorButtonClicked = false;
      } else {
        toDisplayNumber(event);
        value1 = displayContainer.innerText;
      }
    });
  });

  arrOperatorButton.forEach(function (operator) {
    operator.addEventListener("click", function (event) {
      isOperatorButtonClicked = true;
      if (event.target.value !== "=") {
        operatorChar = event.target.value;
        displayContainer.innerText = value1;
      } else {
        displayContainer.innerText = value1;
      }
    });
  });
});
