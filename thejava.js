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

function modulo(num1, num2) {
  return num1 % num2;
}

function operate(operator, num1, num2) {
  let result = 0;

  switch (operator) {
    case "/":
      result = divide(num1, num2);
      break;
    case "mod":
      result = modulo(num1, num2);
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

function toChangeNumber(funcButton, value) {
  const displayContainer = document.querySelector(".display-container");
  let result = "";
  switch (funcButton.target.value) {
    case "C":
      displayContainer.innerText = 0;
      result = 0;
      break;
    case "M-":
      displayContainer.innerText = -Math.abs(displayContainer.innerText);
      result = -Math.abs(displayContainer.innerText);
      break;
    case "M+":
      displayContainer.innerText = Math.abs(displayContainer.innerText);
      result = Math.abs(displayContainer.innerText);
      break;
    case "%":
      result = displayContainer.innerText / 100;
      displayContainer.innerText = (
        displayContainer.innerText / 100
      ).toPrecision(4);
      break;
    case ".":
      displayContainer.innerText += ".";
      result = displayContainer.innerText + ".";
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
  const arrOperator = ["mod", "/", "*", "-", "+", "="];
  let arrButton = arrToDomButton(arrOperator, "operatorButton");

  return arrButton;
}

function addfuncButton() {
  const arrFunc = ["M-", "M+", "%", "."];
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
  let result = "";
  if (displayContainer.innerText === "0") {
    displayContainer.innerText =
      parseFloat(displayContainer.innerText) + parseFloat(event.target.value);
    result = displayContainer.innerText;
  } else if (displayContainer.innerText === "") {
    displayContainer.innerText += event.target.value;
    result += event.target.value;
  } else if (parseFloat(displayContainer.innerText) < maxInteger) {
    displayContainer.innerText += event.target.value;
    result += event.target.value;
  }

  return result;
}

document.addEventListener("DOMContentLoaded", function () {
  generateCalculator();
  let isOperatorButtonClicked = false;
  let isDecimalClicked = false;
  let isEqualSignClicked = false;
  let operatorChar = null;
  let value1 = "";
  let value2 = "";
  let result = 0;
  const MAX_INTEGER = Number.MAX_SAFE_INTEGER / 100000000;

  const numberContainer = document.querySelector(".number-container");
  const operatorContainer = document.querySelector(".operator-container");
  const functionContainer = document.querySelector(".function-container");
  const displayContainer = document.querySelector(".display-container");
  displayContainer.innerText = 0;

  const arrNumberButton = numberContainer.querySelectorAll("button");
  const arrOperatorButton = operatorContainer.querySelectorAll("button");
  const arrfunctionButton = functionContainer.querySelectorAll(
    "button:not(:first-child)"
  );
  const clearButton = document.querySelector(".clearButton");
  const deleteButton = document.querySelector(".deleteButton");

  document.addEventListener("keydown", function (event) {
    if (event.key > 0 && event.key <= 9) {
      if (isOperatorButtonClicked) {
        value2 += event.key;
        if (value2 < MAX_INTEGER) {
          value2 = parseFloat(value2);
          displayContainer.innerText = value2;
        }
      } else {
        value1 += event.key;
        if (value1 < MAX_INTEGER) {
          value1 = parseFloat(value1);
          displayContainer.innerText = value1;
        }
      }
    }
    result = operate(operatorChar, parseFloat(value1), parseFloat(value2));
  });

  deleteButton.addEventListener("click", function (event) {
    let currDisplayValue = displayContainer.innerText.slice(0, -1);
    if (value1 !== "" && isOperatorButtonClicked === true) {
      value2 = parseFloat(currDisplayValue);
      displayContainer.innerText = parseFloat(currDisplayValue);
    } else {
      value1 = parseFloat(currDisplayValue);
      displayContainer.innerText = parseFloat(currDisplayValue);
    }
    result = operate(operatorChar, value1, value2);
  });
  clearButton.addEventListener("click", function (event) {
    toChangeNumber(event);
    isOperatorButtonClicked = false;
    isDecimalClicked = false;
    isEqualSignClicked = false;
    operatorChar = null;
    value1 = "";
    value2 = "";
    result = 0;
  });

  arrfunctionButton.forEach(function (funcButton) {
    funcButton.addEventListener("click", function (event) {
      isFuncButtonClicked = true;
      if (event.target.value !== "." && isOperatorButtonClicked === false) {
        value1 = toChangeNumber(event);
      } else if (
        event.target.value !== "." &&
        isOperatorButtonClicked === true
      ) {
        value2 = toChangeNumber(event);
      } else if (
        isDecimalClicked === false &&
        isOperatorButtonClicked === false
      ) {
        toChangeNumber(event);
        value1 = value1 === "" ? 0 + "." : value1 + ".";
        isDecimalClicked = true;
      } else if (
        isDecimalClicked === false &&
        isOperatorButtonClicked === true
      ) {
        toChangeNumber(event);
        value2 += ".";
        isDecimalClicked = true;
      }

      result = operate(operatorChar, parseFloat(value1), parseFloat(value2));
    });
  });

  arrNumberButton.forEach(function (number) {
    number.addEventListener("click", function (event) {
      if (isEqualSignClicked === true) {
        result = 0;
        value1 = "";
        value2 = "";
        isEqualSignClicked = false;
        isOperatorButtonClicked = false;
        displayContainer.innerText = "";
      }

      if (isOperatorButtonClicked) {
        value2 += toDisplayNumber(event);
        value2 = parseFloat(value2);
        displayContainer.innerText = value2;
      } else {
        value1 += toDisplayNumber(event);
        value1 = parseFloat(value1);
        displayContainer.innerText = value1;
        result += value1;
      }
      result = operate(operatorChar, value1, value2);
    });
  });

  arrOperatorButton.forEach(function (operator) {
    operator.addEventListener("click", function (event) {
      operatorChar = event.target.value;
      isOperatorButtonClicked = true;

      if (
        (isOperatorButtonClicked && value1 == "" && value2 == "") ||
        isNaN(value1) === true
      ) {
        value1 = "";
        value2 = "";
        result = 0;
        displayContainer.innerText = 0;
      } else if (value2 === "") {
        result = "";
        isDecimalClicked = false;
        displayContainer.innerText = result;
        return 0;
      }
      value1 = parseFloat(result);
      value2 = "";

      displayContainer.innerText = Math.round(result * 100) / 100;
      if (event.target.value === "=") {
        isEqualSignClicked = true;
      }
    });
  });
});
