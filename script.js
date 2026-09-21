let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');
const previousOp = document.getElementById('previous-op');

function updateDisplay() {
    display.innerText = currentInput;

    if (operation && previousInput !== '') {
        previousOp.innerText =
            `${previousInput} ${getOpSymbol(operation)}`;
    } else {
        previousOp.innerText = '';
    }
}

function getOpSymbol(op) {
    if (op === '*') return '×';
    if (op === '/') return '÷';
    return op;
}

function appendValue(val) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }

    if (val === 'π') {
        currentInput = Math.PI.toString();
        updateDisplay();
        return;
    }

    if (val === '.' && currentInput.includes('.')) return;

    if (currentInput === '0' && val !== '.') {
        currentInput = val;
    } else {
        currentInput += val;
    }

    updateDisplay();
}

function setOperation(op) {
    if (operation !== null) {
        calculateResult();
    }

    previousInput = currentInput;
    operation = op;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function calculateSqrt() {
    const num = parseFloat(currentInput);

    if (num < 0) {
        currentInput = 'Error: Negative Sqrt';
    } else {
        currentInput = Math.sqrt(num).toString();
    }

    operation = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function calculateResult() {
    if (!operation || previousInput === '') return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result = 0;

    try {
        switch (operation) {
            case '+':
                result = num1 + num2;
                break;

            case '-':
                result = num1 - num2;
                break;

            case '*':
                result = num1 * num2;
                break;

            case '/':
                if (num2 === 0) {
                    throw new Error("Divide by Zero");
                }
                result = num1 / num2;
                break;

            case '%':
                result = num1 % num2;
                break;

            case '^':
                result = Math.pow(num1, num2);
                break;
        }

        currentInput = result.toString();
        operation = null;
        previousInput = '';
        shouldResetDisplay = true;

    } catch (err) {
        currentInput = 'Error: ' + err.message;
        operation = null;
        previousInput = '';
        shouldResetDisplay = true;
    }

    updateDisplay();
}