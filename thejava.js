function add(num) {}

function subtract(num) {}

function multiply(num) {}

function divide(num) {}

function operate(operator, num1, num2) {}

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

document.addEventListener("DOMContentLoaded", function (event) {
  generateCalculator();

  const numberContainer = document.querySelector(".number-container");
  const operatorContainer = document.querySelector(".operator-container");
  const displayContainer = document.querySelector(".display-container");

  const maxInteger = Number.MAX_SAFE_INTEGER / 100000000;
  const arrNumberButton = numberContainer.querySelectorAll("button");
  arrNumberButton.forEach(function (number) {
    number.addEventListener("click", function (event) {
      let initialValue = parseInt(displayContainer.innerText);
      if (initialValue === 0) {
        displayContainer.innerText =
          initialValue + parseInt(event.target.value);
      } else if (parseInt(displayContainer.innerText) < maxInteger) {
        displayContainer.innerText += event.target.value;
      }
    });
  });

  const arrValue = new Array(1);
  const arrOperatorButton = operatorContainer.querySelectorAll("button");
  arrOperatorButton.forEach(function (operator) {
    operator.addEventListener("click", function (event) {
      switch (event.target.value) {
        case "/":
          console.log("awikwok");
          break;
        case "%":
          console.log("awikwok");
          break;
        case "*":
          console.log("awikwok");
          break;
        case "-":
          console.log("awikwok");
          break;
        case "+":
          arrValue.push(displayContainer.innerText);
          displayContainer.innerText = "";
          console.log(arrValue);
          break;
        case "=":
          console.log("awikwok");
          break;
        default:
          break;
      }
    });
  });
});
