let billInput = document.querySelector('#bill-input');
let customTip = document.querySelector('#custom-tip');
let numberOfPeopleInput = document.querySelector('#people-input');
let resetButton = document.querySelector('#reset');
let tipPrice = document.querySelector('#tip-price');
let totalPrice = document.querySelector('#total-price');

let errorNumOfPeople = document.querySelector('#error-numOfPeople');
let errorBill = document.querySelector('#error-bill');

let errorNumOfPeopleStr = document.querySelector('#error-numOfPeople-str');
let errorBillStr = document.querySelector('#error-bill-str');
let errorCustomTipStr = document.querySelector('#tip-str');

let tipPercentage = 0;
let bill = 0;
let numberOfPeople = 0;
let total = 0;
let tip = 0;
let validReg = /^([0-9]+\.?[0-9]*|\.[0-9]+)$/;

//get input values

let getTipPercentageButton = e => {
    tipPercentage = e.target.value;
    calculateBill();
}

let getTipPercentageInput = () => {
    customTip.value ? tipPercentage = customTip.value : tipPercentage = 0;
    if (!validReg.test(tipPercentage)) {
        errorCustomTipStr.classList.remove('hidden');
        customTip.style.border = '2px solid red';
    } else {
        errorCustomTipStr.classList.add('hidden');
        customTip.style.border = 'none';
    }
    calculateBill();
}

let getNumberOfPeople = () => {
    numberOfPeopleInput.value ? numberOfPeople = numberOfPeopleInput.value : numberOfPeople = 0;
    if (parseFloat(numberOfPeople) === 0) {
        errorNumOfPeopleStr.classList.add('hidden');
        errorNumOfPeople.classList.remove('hidden');
        numberOfPeopleInput.style.border = '2px solid red';
    } else if (!validReg.test(numberOfPeople)) {
        errorNumOfPeopleStr.classList.remove('hidden');
        errorNumOfPeople.classList.add('hidden');
        numberOfPeopleInput.style.border = '2px solid red';
    } else {
        errorNumOfPeople.classList.add('hidden');
        errorNumOfPeopleStr.classList.add('hidden');
        numberOfPeopleInput.style.border = 'none';
    }
    calculateBill();
}

let getBill = () => {
    billInput.value ? bill = billInput.value : bill = 0;
    if (parseFloat(bill) === 0) {
        errorBillStr.classList.add('hidden');
        errorBill.classList.remove('hidden');
        billInput.style.border = '2px solid red';
    } else if (!validReg.test(bill)) {
        errorBill.classList.add('hidden');
        errorBillStr.classList.remove('hidden');
        billInput.style.border = '2px solid red';
    } else {
        errorBill.classList.add('hidden');
        errorBillStr.classList.add('hidden');
        billInput.style.border = 'none';
    }
    calculateBill();
}

//calculate bill and tip per person, display errors if necessary

let calculateBill = () => {
    if (
        parseFloat(numberOfPeople) === 0 || parseFloat(bill) === 0 || tipPercentage === 0 ||
        !validReg.test(bill) || !validReg.test(numberOfPeople) || !validReg.test(tipPercentage)) {
        tipPrice.textContent = '$0.00';
        totalPrice.textContent = '$0.00';
        resetButton.disabled = true;
    } else {
        tip = Math.round(bill / numberOfPeople * (tipPercentage / 100) * 100) / 100;
        total = Math.round((tip + bill / numberOfPeople) * 100) / 100;
        tipPrice.textContent = `$${tip}`;
        totalPrice.textContent = `$${total}`;
        resetButton.disabled = false;
    }
}

//reset values of forms

let reset = () => {
    resetButton.disabled = true;
    tipPrice.textContent = '$0.00';
    totalPrice.textContent = '$0.00';
    tipPercentage = 0;
    bill = 0;
    numberOfPeople = 0;
    total = 0;
    tip = 0;
    billInput.value = '';
    customTip.value = '';
    numberOfPeopleInput.value = '';
}

//Events listener

document.querySelectorAll('.choice-button').forEach(button => {
    button.addEventListener('click', getTipPercentageButton);
})

customTip.addEventListener('change', getTipPercentageInput);
numberOfPeopleInput.addEventListener('change', getNumberOfPeople);
billInput.addEventListener('change', getBill);
resetButton.addEventListener('click', reset);