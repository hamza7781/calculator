let buffer = '0';
const screen = document.querySelector('.outcome');
let runningTotal = 0;
let previousOpertor;


function buttonClick(value) {
    if (isNaN(parseInt(value))) {
    handlesymbol(value);
    } else {
    handleNumber(value)
    }
    rerender();
}

function handleNumber(number){
    if (buffer === '0') {
        buffer = number;
    } else {
        buffer += number;
        //concatenation 
        
    }
}

function handleMath(value) {
    if (buffer === '0') {
        // do nothing
        return;
    }
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = buffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOpertor = value;
    buffer = '0';
    
}

function flushOperation(intBuffer) {
    if (previousOpertor === '+') {
        runningTotal = runningTotal + intBuffer // means running total + intBuffer
    } else if (previousOpertor === '-') {
        runningTotal -= intBuffer // means running total - intBuffer
    } else if (previousOpertor === '×') {
        runningTotal *= intBuffer // means running total * intBuffer
    } else if (previousOpertor === '÷') {
        runningTotal /= intBuffer // means running total / intBuffer
    }
}
function handlesymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            break;
        case '=':
            if (previousOpertor === null) {
                // need two numbers to do maths
                return;
            }
            flushOperation(parseInt(buffer));
            previousOpertor = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1){
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break;
        case '+':
        case '-':
        case '÷':
        case '×':
            handleMath(symbol);
            break;
    }

}

function init(){
    
    document
        .querySelector('.calc-buttons')
        .addEventListener("click", function(event) {
            buttonClick(event.target.innerText);
        } )
}

function rerender() {
    screen.innerText = buffer;
}


init();
