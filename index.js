class Calculator {
    constructor(inputScreen, resultScreen) {
        this.inputScreen = inputScreen;
        this.resultScreen = resultScreen;
        this.clear();
    }

    insertNumber(number) {
        this.outputDisplay = this.resultScreen.innerText.toString() + number.toString();
        // this.outputDisplay = number.toString()
    }
    useOperation(operation) {
        this.inputDisplay = this.resultScreen.innerText.toString() + operation.toString();
        this.outputDisplay = '';
    }
    funct(event) {
        let angleValue = ((this.resultScreen.innerText)*(Math.PI/180));
        let value = this.resultScreen.innerText;
        switch (event.target.innerText) {
            case ("sin"):
                this.outputDisplay = Math.sin(angleValue);
                break;
                
            case ("cos"):
                this.outputDisplay = Math.cos(angleValue);
                break;

            case ("tan"):
                this.outputDisplay = Math.tan(angleValue);
                break;

            case ("ln"):
                this.outputDisplay = Math.log(value);
                break;
            case ("log"):
                this.outputDisplay = Math.log10(value);
                break;
            case ("!"):
                this.outputDisplay = facto(value);
                break;
            case ("ℼ"):
                this.outputDisplay = Math.PI;
                break;
            case ("e"):
                this.outputDisplay = Math.exp(1);
                break;
            case ("√x"):
                this.inputDisplay = this.inputScreen.innerText + Math.sqrt(this.resultScreen.innerText);
                this.outputDisplay = ''
                break;
            case ("sinh"):
                this.outputDisplay = Math.sinh(angleValue);
                break;
            case ("cosh"):
                this.outputDisplay = Math.cosh(angleValue);
                break;
        }
    }

    expo() {
        this.inputDisplay = this.resultScreen.innerText + '^';
        this.outputDisplay = "";
        const observer = new MutationObserver(callback)
        observer.observe(this.inputScreen,conf)

    }

    clear() {
        this.inputDisplay = "";
        this.outputDisplay = "";
        this.tempDisplay = '';
    }
    delete() {
        this.outputDisplay = this.resultScreen.innerText.slice(0, -1);
    }
    calculate() {
        this.outputDisplay = eval((this.inputScreen.innerText).concat(this.resultScreen.innerText));
        this.inputDisplay = (this.inputScreen.innerText).concat(this.resultScreen.innerText)
    }
    updateScreen() {
        this.inputScreen.innerText = this.inputDisplay;
        this.resultScreen.innerText = this.outputDisplay;
    }
}

const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const functionButtons = document.querySelectorAll('.function');
const allClearButton = document.querySelector(".all-clear");
const deleteButton = document.querySelector(".delete");
const equalButton = document.querySelector(".equal");
const inputScreen = document.querySelector(".input-screen");
const resultScreen = document.querySelector(".result-screen");
const arrowButton = document.querySelector(".arrow");
const sidePanel = document.querySelector(".side-panel");
const exponent = document.querySelector(".exponent");


const calculator = new Calculator(inputScreen, resultScreen);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.insertNumber(button.innerText);
        calculator.updateScreen();
    })
})

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateScreen();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateScreen();
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.useOperation(button.innerText);
        calculator.updateScreen();
    })
})

functionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        calculator.funct(e);
        calculator.updateScreen();
    })
})

equalButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateScreen();
})

 exponent.addEventListener('click', () => {
    calculator.expo();
    calculator.updateScreen();
})



// factorial function

function facto(n) {
    if (n === 0 || n === 1) {
        return 1
    } else {
        return n * facto(n - 1)
    }
}



// x to the power y

const conf = {
    atrributes:true,
    childList:true,
    CharacterData : true
}

function regexExpo(input) {
    return input.match(/(\d+)(\^)(\d+)/)
}

const callback = function (mutation, observer) {
    if((/(\d+)(\^)(\d)/).test(inputScreen.innerText)){
        regexExpo(inputScreen.innerText)
        const power = regexExpo(inputScreen.innerText)[3]
        const base = regexExpo(inputScreen.innerText)[1]
        // console.log(power, base)
        inputScreen.innerText = Math.pow(base, power)
        resultScreen.innerText = Math.pow(base, power)
    }
}





// slider toggle

document.addEventListener("click", (e) => {
    if (e.target.matches(".arrow") || e.target.matches(".arrow-btn")) {
        sidePanel.classList.toggle("active")
    }
    
    if(sidePanel.classList.contains("active") && (!e.target.matches('.arrow') && !e.target.matches('.arrow-btn') ) ){
        if (!(e.target.matches('.side-panel')) && !(e.target.matches('.side-panel-btn')) ) {
            sidePanel.classList.remove("active")
        }
    }
})


