const bill = document.querySelector(".input-bill");
const percentage = document.querySelector(".input-percentage");
const buttons = document.querySelector(".button-field");
buttons.style.visibility = "hidden"; //hides the tip selector panel until button is clicked
let btn1 = document.querySelector("#btn1");
let btn2 = document.querySelector("#btn2");
let btn3 = document.querySelector("#btn3");
let btn4 = document.querySelector("#btn4");
let totalBill = document.querySelector("#inp1");
let rating = document.querySelector("#inp2");
let calculate = document.querySelector("#Calculate");
let calculatedTip;
function recordBill () {
    console.log("Total Bill:",totalBill.value);
    let billInput = totalBill.value;
}
function recordPercentage (){
    console.log("Tip:",rating.value);
    let tipInput = rating.value;
}
function calculateTip(){
    recordBill();
    recordPercentage();
    console.log("Total Bill:",totalBill.value);
    console.log("Rating Recieved:",rating.value);
    console.log("Calculated tip = ",calculatedTip);
    btn1.innerText = 0;
    btn2.innerText = ((5/100)*totalBill.value);
    btn3.innerText = ((10/100)*totalBill.value);
    btn4.innerText = ((15/100)*totalBill.value);
    buttons.style.visibility = "visible"; //when calculate button is clicked the panel is visible with the tip amounts
}
totalBill.addEventListener('change',recordBill);
rating.addEventListener('change',recordPercentage);
calculate.addEventListener('click',calculateTip);