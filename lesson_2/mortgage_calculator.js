const readline = require('readline-sync');

const MESSAGE = require('./mortgage_calculator.json');

let language;

function isIntroNumberValid(number) {
  return number !== '1' && number !== '2' && number !== '3';
}

function changeLanguage(number) {
  let code;
  switch (number) {
    case '1':
      code = 'en';
      break;
    case '2':
      code = 'es';
      break;
    case '3':
      code = 'kn';
      break;
  }
  return code;
}

function introMessage(messageIntro) {
  return MESSAGE["beginning"][messageIntro];
}

function isValidMessages(message1, lang = "en") {

  return MESSAGE[lang][message1];
}

function messages(message1, lang = language) {

  return MESSAGE[lang][message1];
}

function promptIndicator(message) {

  console.log(`\n--> ${message}\n`);
}

function isInvalidDecimalRateOrNegative(rate) {

  return rate.trimStart() === "" || Number.isNaN(Number(rate)) ||

  rate[0] === '.' || rate[0] === "-";
}

function isInvalidLoanDuration (number) {

  return number < 0 ? true : false || number.trimStart() === "" ||

  Number.isNaN(Number(number)) || number === "0" || number.includes(".");
}

function isInvalid(wrongAnswer) {
  return wrongAnswer !== 'yes' && wrongAnswer !== 'YES' && wrongAnswer !== 'y'
  && wrongAnswer !== 'Y' && wrongAnswer !== 'Yes' && wrongAnswer !== 'no'
  && wrongAnswer !== 'NO' && wrongAnswer !== 'n' && wrongAnswer !== 'N'
  && wrongAnswer !== 'No';
}

function isInvalidNegativeZeroNumbers(number) {

  return number[0] === '-' || Number(number) === 0 ||
  number.trimStart() === "" || Number.isNaN(Number(number));
}

function calculateMonthlyMortgagePayment(
  loanAmount,interestRateAnnual,loanDurationYears) {
  let interestRateMonthly;
  let loanDurationMonthly;
  let monthlyPayment;

  if (interestRateAnnual === '0') {

    monthlyPayment = (loanAmount / loanDurationYears) / 12;

    return monthlyPayment.toFixed(2);

  } else {

    interestRateMonthly = (interestRateAnnual * .01) / 12;

    loanDurationMonthly = loanDurationYears * 12;

    monthlyPayment = loanAmount * (interestRateMonthly / (1 - Math.pow(
      (1 + interestRateMonthly), (-loanDurationMonthly))));

    return monthlyPayment.toFixed(2);
  }
}

function formatMonthlyPayment(monthlyPaymentWithDecimal) {

  let monthlyPaymentObject = new Intl.NumberFormat(undefined, {

    style: 'currency',

    currency: 'USD',
  });

  let monthlyPaymentFormatted = monthlyPaymentObject.format(
    monthlyPaymentWithDecimal);

  console.log(`\n--> ${MESSAGE[language]["monthlyPayment"]}: ${monthlyPaymentFormatted}`);
}


while (true) {

  console.clear();

  promptIndicator(introMessage("intro"));

  let number = readline.question();


  while (isIntroNumberValid(number)) {

    console.log(isValidMessages("intro", "beginning"));

    number = readline.question();

  }

  language = changeLanguage(number);


  promptIndicator(messages("loanAmount"));

  let loanAmount = readline.question();


  while (isInvalidNegativeZeroNumbers(loanAmount)) {

    console.log(messages("negativeAmountZeroNumbers"));

    loanAmount = readline.question();
  }


  promptIndicator(messages("interestIntegerOrFloat"));

  let interestRateAnnual = readline.question();


  while (isInvalidDecimalRateOrNegative(interestRateAnnual)) {

    console.log(messages("decimalRateOrNegative"));

    interestRateAnnual = readline.question();
  }


  promptIndicator(messages("loanDuration"));

  let loanDurationYears =  readline.question();


  while (isInvalidLoanDuration(loanDurationYears)) {

    console.log(messages("zeroDuration"));

    loanDurationYears = readline.question();
  }


  let monthlyPayment = calculateMonthlyMortgagePayment(
    loanAmount, interestRateAnnual,loanDurationYears);

  formatMonthlyPayment(monthlyPayment);


  promptIndicator(messages("anotherCalculation"));

  let answer = readline.question();


  while (isInvalid(answer)) {

    console.log(messages("yesOrNo"));

    answer = readline.question();
  }

  if (answer[0] === 'n') {
    console.clear();
    break;
  } else {
    continue;
  }

}
