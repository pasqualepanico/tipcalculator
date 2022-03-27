var inputBillField = document.querySelector(".first");
var resetButton = document.querySelector(".reset-button");
var nberOfPeople = document.querySelector(".second");

function changingBillValue(e){ //Animation of the input bill when you enter a value in Bill
  if(e.target){
    inputBillField.style.borderStyle = "solid";
    inputBillField.style.borderWidth = "2px";
    inputBillField.style.borderColor = "hsl(172, 67%, 45%)";
  }
}

inputBillField.addEventListener('input', changingBillValue);

function resetByClick(e){
  if(e.target){
    resetButton.style.backgroundColor = "#16817A";
    inputBillField.value = "";
    nberOfPeople.value = "";
    document.querySelector(".tip-amount .outcome").innerHTML = '$0.00';
    document.querySelector(".total .outcome").innerHTML = '$0.00';
    document.querySelector(".custom").value = "Custom";
  }
    setTimeout(removeReset, 3500);
}

resetButton.addEventListener('click', resetByClick);

//removeReset: placing the backgroundcolor of the RESET button to the main one

function removeReset(){
  resetButton.style.backgroundColor = 'hsl(172, 67%, 45%)';
  inputBillField.value = '';
  document.querySelector(".tip-amount .outcome").innerHTML = '';
  document.querySelector(".total .outcome").innerHTML = '';
}

// adding an event keypress when 0 is typed on the keyboard

function zeroWasPressed(event){

  if (event.target.value === '0'){
    nberOfPeople.classList.add("people");
    document.querySelector(".number-people").innerHTML = "Can't be zero";
  }
  setTimeout(removeZeroWasPressed, 5000);
}

nberOfPeople.addEventListener('keypress', zeroWasPressed);

//removing the styling set with f removeZeroWasPressed

function removeZeroWasPressed(){
  nberOfPeople.classList.remove("people");
  document.querySelector(".number-people").innerHTML = "";
}

//getting the object of the Custom button

var customButton = document.querySelector(".custom");

function addInputToCustom(evt) {
    if(evt.target){
        customButton.setAttribute("type", "text");
        customButton.style.color = 'hsl(183, 100%, 15%)';
        customButton.style.textAlign = 'right';

    }
}

customButton.addEventListener('click', addInputToCustom);

var nberOfTipButtons = document.querySelectorAll(".tip").length;
var buttonClick = '';

 for(var i = 0; i < nberOfTipButtons; i++){

     document.querySelectorAll(".tip")[i].addEventListener("click", function(e){
       if(e.target){
         buttonClick = e.target.value;
         console.log(buttonClick);
       }

         var takeOffPercentSign = buttonClick.slice(0, buttonClick.length -1);
         console.log(takeOffPercentSign);

          var b = Number (inputBillField.value);
          var p = Number(takeOffPercentSign);
          var n = Number (nberOfPeople.value);

         if (n != 0 && b >  0){
             document.querySelector(".tip-amount .outcome").innerHTML = "$" + calculateTipAmount(b, p, n);
             document.querySelector(".total .outcome").innerHTML = '$' + calculateTotal(b, p, n);
              setTimeout(startOver, 2000);
             }
                    else { alert ("Fill the Bill value and the Number of People before selecting Tip %");}

    });


}

function calculateTipAmount(bill, percentSign, nPeople ){

  var percentage = (bill/100) * percentSign;
  var percentPerPerson = percentage/nPeople;
  return percentPerPerson.toFixed(2);
}

function calculateTotal(inputB, percent, people){
  var splitter = inputB/people;
  splitter = splitter.toFixed(2);
  var div = Number(splitter);
  var tipAmount = calculateTipAmount(inputB, percent, people);
  var t = Number(tipAmount);
  var total = div + t;
  return total.toFixed(2);
}

function startOver(){
  alert ("Click Reset Button to start again!");
}
