let operand1 = 0;
let operator;
let operand2 = 0;
let justCalculated = false;

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (a / 0) {
        return 0;
    }else {
    return a / b;
}}

function operate(operand1, operator, operand2) {
    switch (operator) {
        case "+":
            return add(operand1, operand2);
            break;
        case "-":
            return subtract(operand1, operand2);
            break;
        case "*":
            return multiply(operand1, operand2);
            break;
        case "/":
            return divide(operand1, operand2);
            break;
        default:
            console.log("Invalid operator!");
    }
}

// DOM and Events


const operators = ["c" ,"+", "-", "*", "/", "="];

const container = document.querySelector(".container");
const digitDiv = document.createElement("div");
const buttons = document.createElement("div");
const display = document.createElement("textarea");
const displayDiv = document.createElement("div");
buttons.classList.add("buttons");
digitDiv.classList.add("digits");
displayDiv.classList.add("display");

const operatorsDiv = document.createElement("div");
operatorsDiv.classList.add("operators");

// Digits buttons

for (let i = 1; i < 10; i++) {
    const digitButton = document.createElement("button");
    digitButton.classList.add("digits");
    digitButton.textContent = i;
    //digitButton.style.width = "max-content";
    //digitButton.style.height = "max-content";
    digitDiv.appendChild(digitButton);
}

// Zero button
const zeroButton = document.createElement("button");
zeroButton.textContent = 0;
digitDiv.appendChild(zeroButton);
zeroButton.style.paddingLeft = "25%";
zeroButton.style.paddingRight = "25%";

// Comma button
const comma = document.createElement("button");
comma.textContent = ".";
digitDiv.appendChild(comma);


// operators buttons
for (let i = 0; i < operators.length; i++) {
    const operatorButton = document.createElement("button");
    operatorButton.classList.add("operators");
    operatorButton.textContent = operators[i];
    //operatorButton.style.width = "max-content";
    operatorsDiv.appendChild(operatorButton);
}

// styles
operatorsDiv.style.display = "flex";
operatorsDiv.style.flexDirection = "column";
digitDiv.style.display = "flex";
digitDiv.style.flexDirection = "row";
digitDiv.style.flexWrap = "wrap";
displayDiv.style.display = "flex";
displayDiv.style.flexDirection = "column";
buttons.style.display = "flex";
digitDiv.style.justifyContent = "center";
digitDiv.style.gap = "2px";




displayDiv.appendChild(display);
container.appendChild(displayDiv);
buttons.appendChild(digitDiv);
buttons.appendChild(operatorsDiv);
container.appendChild(buttons);

// Event listeners
digitDiv.addEventListener("click", function(e) {
    if (justCalculated == true) {
        display.textContent = "";
        justCalculated = false;
    }
    operand1 = e.target.innerText;
    display.textContent += operand1;

})
operatorsDiv.addEventListener("click", function(e) {
    justCalculated = false;
    operator = e.target.innerText;
    display.textContent += " " + operator + " ";
    
    if (operator === "=") {
        justCalculated = true;
        let operation = display.textContent.split(" ").slice(0,3);
        if (operation[0].includes(".")) {
            let result = operate(parseFloat(operation[0]), operation[1], parseFloat(operation[2]));
            display.textContent = result.toFixed(2);
        }else {
            let result = operate(parseInt(operation[0]), operation[1], parseInt(operation[2]));
            display.textContent = result; 
        }
        
    }else if (display.textContent.split(" ").length > 3) {
        let operation = display.textContent.split(" ").slice(0,3);
        if (operation[0].includes(".")) {
            let result = operate(parseFloat(operation[0]), operation[1], parseFloat(operation[2]));
            display.textContent = result.toFixed(2) + " " + operator + " ";
        }else {
            let result = operate(parseInt(operation[0]), operation[1], parseInt(operation[2]));
            display.textContent = result + " " + operator + " ";
        }

    }if (operator === "c") {
        display.textContent = "";
    }

});


