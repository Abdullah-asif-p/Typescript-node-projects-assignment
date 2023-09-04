#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const startapp = async () => {
  console.clear();
  console.log(`
    ${chalk.bgMagenta("Welcome to the Currency Exchange App!")}\n
  This app allows you to convert between different currencies such as USD, EUR, GBP, JPY, and PKR.
  Simply select the currencies and enter the amount you want to convert, and the app will calculate the conversion for you.\n
  `);
  await sleep();
  await currencies();
};

const currencies = async () => {
  const userInput1 = await inquirer.prompt({
    type: "list",
    message: "Please choese a currency to convert form",
    name: "currency",
    choices: ["USD", "EUR", "GBP", "JPY", "PKR"],
  });
  const currency1: string = userInput1.currency;
  const inputAmount = await inquirer.prompt([
    {
      type: "number",
      name: "amount",
      message: "Please enter amount:",
      validate: (input) => {
        if (isNaN(input) || input <= 0) {
          return "Please enter something";
        }
        return true;
      },
    },
  ]);

  const userInput2 = await inquirer.prompt([
    {
      type: "list",
      message: `${currency1} to`,
      name: "currency",
      choices: ["USD", "EUR", "GBP", "JPY", "PKR"],
    },
  ]);
  const currency2: string = userInput2["currency"];
  const amount: number = inputAmount.amount;
  currency1 == currency2
    ? (console.log(
        `You selected the same currency (${currency1}) to convert from and to.\n`
      ),
      currencies())
    : convert(currency1, currency2, amount);
};

const convert = async (
  currency1: string,
  currency2: string,
  amount: number
) => {
  let convertedAmount: number = 0;
  switch (currency1) {
    case "USD":
      switch (currency2) {
        case "EUR":
          convertedAmount = amount * 0.92;
          break;
        case "GBP":
          convertedAmount = amount * 0.79;
          break;
        case "JPY":
          convertedAmount = amount * 106.57;
          break;
        case "PKR":
          convertedAmount = amount * 306.0;
          break;
      }
      break;
    case "EUR":
      switch (currency2) {
        case "USD":
          convertedAmount = amount * 1.09;
          break;
        case "GBP":
          convertedAmount = amount * 0.86;
          break;
        case "JPY":
          convertedAmount = amount * 115.76;
          break;
        case "PKR":
          convertedAmount = amount * 332.49;
          break;
      }
      break;
    case "GBP":
      switch (currency2) {
        case "USD":
          convertedAmount = amount * 1.27;
          break;
        case "EUR":
          convertedAmount = amount * 1.16;
          break;
        case "JPY":
          convertedAmount = amount * 142.83;
          break;
        case "PKR":
          convertedAmount = amount * 388.44;
          break;
      }
      break;
    case "PKR":
      switch (currency2) {
        case "USD":
          convertedAmount = amount * 0.0033;
          break;
        case "EUR":
          convertedAmount = amount * 0.003;
          break;
        case "JPY":
          convertedAmount = amount * 0.47;
          break;
        case "GBP":
          convertedAmount = amount * 0.0026;
          break;
      }
      break;
    case "JPY":
      switch (currency2) {
        case "USD":
          convertedAmount = amount * 0.01;
          break;
        case "EUR":
          convertedAmount = amount * 0.01;
          break;
        case "PKR":
          convertedAmount = amount * 2.11;
          break;
        case "GBP":
          convertedAmount = amount * 0.01;
          break;
      }
      break;
  }
  console.log(
    `Conversion Result: ${amount} ${currency1} equals ${convertedAmount} ${currency2}`
  );
};

await startapp();
