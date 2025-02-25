function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
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
      parseFloat(displayContainer.innerText) + parseFloat(event.target.value);
  } else if (displayContainer.innerText === "") {
    displayContainer.innerText += event.target.value;
  } else if (parseFloat(displayContainer.innerText) < maxInteger) {
    displayContainer.innerText += event.target.value;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  generateCalculator();
  let isOperatorButtonClicked = false;
  let isDecimalClicked = false;
  let operatorChar = null;
  let value1 = "";
  let value2 = "";
  let result = "";

  const numberContainer = document.querySelector(".number-container");
  const operatorContainer = document.querySelector(".operator-container");
  const functionContainer = document.querySelector(".function-container");
  const displayContainer = document.querySelector(".display-container");
  displayContainer.innerText = 0;

  const arrNumberButton = numberContainer.querySelectorAll("button");
  const arrOperatorButton = operatorContainer.querySelectorAll("button");
  const arrfunctionButton = functionContainer.querySelectorAll("button");

  arrfunctionButton.forEach(function (funcButton) {
    funcButton.addEventListener("click", function (event) {
      isFuncButtonClicked = true;
      if (event.target.value === "C") {
        operateFunction(event);
        value1 = "";
        value2 = "";
      }
      if (isDecimalClicked === false && isOperatorButtonClicked === false) {
        operateFunction(event);
        value1 = value1 === "" ? 0 + "." : value1 + ".";
        isDecimalClicked = true;
      } else if (
        isDecimalClicked === false &&
        isOperatorButtonClicked === true
      ) {
        operateFunction(event);
        value2 += ".";
        isDecimalClicked = true;
      } else if (event.target.value !== ".") {
        operateFunction(event);
      }
    });
  });

  arrNumberButton.forEach(function (number) {
    number.addEventListener("click", function (event) {
      toDisplayNumber(event);

      if (isOperatorButtonClicked) {
        value2 += event.target.value;
        displayContainer.innerText = value2;
      } else {
        value1 += event.target.value;
      }
      result = operate(operatorChar, parseFloat(value1), parseFloat(value2));
    });
  });

  arrOperatorButton.forEach(function (operator) {
    operator.addEventListener("click", function (event) {
      operatorChar = event.target.value;
      isOperatorButtonClicked = true;
      if (value2 === "") {
        result = "";
        isDecimalClicked = false;
        displayContainer.innerText = result;
        return 0;
      }
      value1 = parseFloat(result);
      value2 = "";

      displayContainer.innerText = Math.round(result * 100) / 100;
    });
  });
});
