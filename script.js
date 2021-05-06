const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// calculate first and second values on operator
const calculate = {
	'/': (firstNumber, secondNumber) => firstNumber / secondNumber,
	'*': (firstNumber, secondNumber) => firstNumber * secondNumber,
	'-': (firstNumber, secondNumber) => firstNumber - secondNumber,
	'+': (firstNumber, secondNumber) => firstNumber + secondNumber,
	'=': (firstNumber, secondNumber) => secondNumber,
}

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number){
// Replace displayvalue is first value is entered
if(awaitingNextValue){
	calculatorDisplay.textContent = number;
	awaitingNextValue = false;
}else{
	const displayValue = calculatorDisplay.textContent;
	calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
}
}

function addDecimal(){
	//if operator presed dont add decimal
	if(awaitingNextValue) return;
	if (!calculatorDisplay.textContent.includes('.')){
		calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
	}
}

function useOperator(operator){
	const currentValue = Number(calculatorDisplay.textContent);
	//prevent multiple values
	if (operatorValue && awaitingNextValue) {
		operatorValue = operator;
		return;
	}	
	// Assign first value
	if (!firstValue){
		firstValue = currentValue;
	}else{
		const calculation = calculate[operatorValue](firstValue, currentValue);
		calculatorDisplay.textContent = calculation;
		firstValue = calculation;
	}
	// Next value stor operator
	awaitingNextValue = true;
	operatorValue = operator;

}

// clear button all restet display
function resetAll(){
	firstValue = 0;
	operatorValue = '';
	awaitingNextValue = false;
	calculatorDisplay.textContent = '0';
	}

// Add Event listeners for numbers operators decimal buttons
inputBtns.forEach((inputBtn) => {
	if (inputBtn.classList.length === 0){
		inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
	}else if (inputBtn.classList.contains('operator')){
		inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
	}else if (inputBtn.classList.contains('decimal')){
		inputBtn.addEventListener('click', () => addDecimal());
	}
});

// reset event listener
clearBtn.addEventListener('click', resetAll);