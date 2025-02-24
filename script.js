const bill = document.querySelector(".bill");
const peopleCount = document.querySelector(".people-count");
const tipButtons = document.querySelectorAll(".tip-button");
const customTip = document.querySelector(".custom-tip");

const tipAmount = document.querySelector(".tip-amount");
const totalAmount = document.querySelector(".total-amount");
const resetButton = document.querySelector(".reset-button");
const errMsg = document.querySelector(".error-msg");

let billAmt = 0;
let people = 0;
let tipPercent = 0;

resetButton.classList.add("inactive");

const numberCheck = (e) => {
  const value = parseFloat(e.target.value);
  if (value < 0 || isNaN(value)) {
    e.target.value = 0;
  }
};

const calculateTip = () => {
  if (people === 0) {
    errMsg.classList.add("active");
    return;
  }
  errMsg.classList.remove("active");

  const tip = (billAmt * tipPercent) / 100;
  const tipPerPerson = tip / people;
  const totalPerPerson = billAmt / people + tipPerPerson;
  //   console.log(tipPerPerson, totalPerPerson);

  tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalAmount.textContent = `$${totalPerPerson.toFixed(2)}`;
};

const removeActiveButton = () => {
  tipButtons.forEach((button) => {
    button.classList.remove("active");
  });
};

const tipButtonValue = (button) => {
  button.addEventListener("click", () => {
    removeActiveButton();
    button.classList.add("active");
    customTip.value = "";
    tipPercent = parseFloat(button.value);
    calculateTip();
  });
};

tipButtons.forEach((button) => {
  tipButtonValue(button);
});

const reset = () => {
  removeActiveButton();
  bill.value = "";
  peopleCount.value = "";
  customTip.value = "";
  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";
};

resetButton.addEventListener("click", () => {
  resetButton.classList.add("inactive");
  reset();
});

bill.addEventListener("input", (e) => {
  numberCheck(e);
  billAmt = e.target.value;
  calculateTip();
  resetButton.classList.remove("inactive");
});

peopleCount.addEventListener("input", (e) => {
  numberCheck(e);
  people = parseInt(e.target.value, 10);
  people === 0
    ? errMsg.classList.add("active")
    : errMsg.classList.remove("active");
  resetButton.classList.remove("inactive");
  calculateTip();
  //   console.log(typeof(e.target.value))
});

customTip.addEventListener("focus", () => {
  removeActiveButton();
});

customTip.addEventListener("input", (e) => {
  numberCheck(e);
  tipPercent = e.target.value;
  resetButton.classList.remove("inactive");
  calculateTip();
});
