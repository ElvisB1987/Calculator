

//class Calculator  including varibles and functions 

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  // function clear delete  evriting 
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  // function delete removeving numbers from displey -1
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  // function appendNumber return only number and we can youse too adding number on diplay evry time when user press the button
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  // operations  if operation diferent for empaty dan call function compute()
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  // function compute in deferent case calculated values 
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  // this functions number or decimal number  to string and spliting per "." 
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  // functions updateDisplay writing values on output display
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);
// event lisener for number and writing on display
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
// event lisener for operation and updating display 
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
// equal button lisiner calculated and write on diplay value 
equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

//  event lisner for clear button 
allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

// event lisner for dlete button and display update
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

// thsi functions channge theme

(function (d) {
  "use strict";
  d.getElementById("myRange").addEventListener(
    "change",
    function () {
      switch (this.value) {
        case "1":
          d.body.classList.remove("theme_2");
          d.body.classList.remove("theme_3");
          d.body.classList.add("theme_1");
          break;
        case "2":
          d.body.classList.remove("theme_1");
          d.body.classList.remove("theme_3");
          d.body.classList.add("theme_2");
          break;
        case "3":
          d.body.classList.remove("theme_1");
          d.body.classList.remove("theme_2");
          d.body.classList.add("theme_3");
          break;
      }
    },
    false
  );
})(document);
