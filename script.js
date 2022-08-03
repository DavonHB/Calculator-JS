// calculator becomes an object
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        // when a new calculator is created it sets everything back to default
        this.clear()
    }

    //calculators abilities
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        // removes the last input string
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    // adds number to display
    appendNumber(number) {
        // only allows . to be entered once otherwise it will stop function from calling
        if ( number === '.' && this.currentOperand.includes('.')) return
        // must convert to string otherwise javascript will add the numbers instead of appending them
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        // will not execute if the operation is already selected and selected a second time preventing the code from being called
        if (this.currentOperand === '') return
        // if the previous operation is filled and another operation is selected then 
        // the compute function will automatically run and then run
        // then code again to pus the current operation to previous operation
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        // when an operation is selected this previousOperand takes the currentOperand and the currentOperand becomes an empty string
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation 
        // variables that convert the string back to a number after input
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // if there is no number in previous or current then do not run code
        if (isNaN(previous) || isNaN(current)) return 
        // switch statements allows you to do a list of if statements chained on an object
        switch (this.operation) {

            //if the operation that is selected is a + sign, execute code

            case '+': 
                computation = previous + current
            break

            case '-': 
                computation = previous - current
            break

            case '*': 
                computation = previous * current
            break

            case '÷': 
                computation = previous / current
            break

            // when no cases are executed it is defaulted to default
            default:
                return
            
        }
        // currentOperand is the result of the computation switch
        this.currentOperand = computation
        this.operation = undefined;
        // sets previousOperand to an empty string so the answer is displayed only on currentOperand
        this.previousOperand = '';
    }

    // helper function to add comas
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        // allows us to set the text of the currentOperand 
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand);

        if (this.operation != null) {
            //sets text of previousOperand when chooseOperation is ran and appends operation to the end of previousOperand
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// hooking up variables above to operate on the calculator object

//defined class with everything in constructor passed into the defined class
// calculator object can be used
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

