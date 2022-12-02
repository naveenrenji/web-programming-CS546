/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:
-Get the value of the input text element.  
-You should be expecting a variable number of arrays typed into the input separated by commas:  For example: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29]
-All array elements should be whole numbers (negative and 0 are allowed), no decimals. 
-Each array should have at least one element that is a whole number (negative and 0 are allowed), no decimals. 
-You can ignore any extra commas for example, inputting: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29], 
-There should be at least one array inputted. 
-You will then return a single array that has all the values from the arrays inputted sorted from lowest to highest number.  For example:  If our input was: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29] You would return:  [0,1,1,2,2,3,3,4,6,8,10,15,25,29]
-Add a list item to the #results list of result of the sort you have just completed. You will alternate the class for each list item using the classes is-green and is-red (described below), starting with is-green first.
-If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of an error somehow.
*/

//const e = require("express");

let myForm = document.getElementById('myForm');
let inputArrays = document.getElementById('inputArrays');
let errorDiv = document.getElementById('error');
let results = document.getElementById('results');
let frmLabel = document.getElementById('formLabel');
let listResults = document.getElementById('listResults');
let count = 0;

if (myForm) {
  myForm.addEventListener('submit', (event) => {
    console.log('Form submission fired');
    event.preventDefault();
    if (inputArrays.value.trim()) {
      errorDiv.hidden = true;
      frmLabel.classList.remove('error');
      let li = document.createElement('li');
      try {
        let input = inputArrays.value.trim();
        if (input[input.length - 1] == ',') {
          input = input.slice(0, -1);
        }
        if(input.indexOf('.')!==-1)
        { throw 'Array element is not a number'; }
        let arrays = JSON.parse(`[${input}]`);
        arrays = validate(arrays);
        arrays = arraySort(arrays);
        li.innerHTML = arrays;
        count++;
        if (count % 2 == 1) {
          li.classList.add('is-green');
        }
        else {
          li.classList.add('is-red');
        }
        results.appendChild(li);
      }
      catch (e) {
        inputArrays.value = '';
        errorDiv.hidden = false;
        errorDiv.innerHTML = "You must enter a valid whole number";
        frmLabel.className = 'error';
        inputArrays.focus();
        inputArrays.className = 'inputClass';
      }
      myForm.reset();
      inputArrays.focus();
    } else {
      inputArrays.value = '';
      errorDiv.hidden = false;
      errorDiv.innerHTML = 'You must enter a value';
      frmLabel.className = 'error';
      inputArrays.focus();
      inputArrays.className = 'inputClass';
    }
  });
}

const validate = (arrays) => {
  arrays.forEach((arr) => {
    if (!arr) { throw 'No argument passed'; }
    if (!Array.isArray(arr)) { throw "Parameter is not an array"; }
    if (arr.length == 0) { throw 'array is empty'; }
    arr.forEach(element => {
      if (typeof element != 'number') { throw 'Array element is not a number'; }
      if ((element - Math.floor(element)) !== 0) {
        { throw 'Array element is not a number'; }
      }
    });
  });
  return arrays;
}

const arraySort = (arrays) => {
  let fullArray = [];
  arrays.forEach((arr) => {
    fullArray = fullArray.concat(arr);
  });
  fullArray.sort(function (a, b) { return a - b });
  return fullArray;
}