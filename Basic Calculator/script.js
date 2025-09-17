let result = document.querySelector(".display");
let button1 = document.querySelector("#addition");
let button2 = document.querySelector("#substract");
let button3 = document.querySelector("#product");
let button4 = document.querySelector("#divide");
let input1 = document.querySelector("#inp1");
let input2 = document.querySelector("#inp2");
let storedValue1 = 0;
let storedValue2 = 0;
let addition = 0;
let substraction = 0;
let product = 0;
let division = 0;
input1.addEventListener('input', (evt) => {
    storedValue1 = parseFloat(evt.target.value);
    console.log(storedValue1);
});

input2.addEventListener('input', (evnt) => {
    storedValue2 = parseFloat(evnt.target.value);
    console.log(storedValue2);
});

button1.addEventListener('click', (evt) => {
    addition = parseFloat(storedValue1 + storedValue2);
    console.log(addition);
    result.innerText = addition;
});

button2.addEventListener('click', (evt) => {
    if(storedValue1 > storedValue2){
        substraction =  parseFloat(storedValue1 - storedValue2);
        console.log(substraction);
        result.innerText = substraction;
    }
    else{
        substraction = parseFloat(storedValue2 - storedValue1);
        console.log(substraction);
        result.innerText = substraction;
    }
});

button3.addEventListener('click', (evt) => {
    product = parseFloat(storedValue1 * storedValue2);
    console.log(product); 
    result.innerText = product;
});

button4.addEventListener('click', (evt) => {
    division = parseFloat(storedValue1 / storedValue2);
    console.log(division);
    result.innerText = division;
}); 