#! /usr/bin/env node
import { randomInt } from "crypto";
import inquirer from "inquirer";
import chalk from "chalk"

const sleep = (ms = 2500) => new Promise((r) => setTimeout(r, ms));


const welcome = async () => {
  console.clear();
  console.log(`
    ${chalk.bgBlue("HOW THIS BANK IS OPERATED")}
    Any input will be accepted in user id 
    but the ${chalk.bgRed("Pin will always be 1234")}
    The Balance for each user is generated randomly
    `);
  await sleep();
  await inputdata();
}


const inputdata = async () => {
  const userInput = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "Enter Userid",
    },
    {
      type: "password",
      name: "pin",
      message: "Enter pin",
      mask: "*",
    },
  ]);
  return output(userInput.id, userInput.pin);
};

const checkBalance = async (amount: number) => {
  let Balance: number = Math.floor(Math.random() * (randomInt(1,200)*randomInt(1,200)*randomInt(1,200))) + 1;
  if (Balance >= amount) {
    Balance -= amount;
    return Balance;
  } else {
    console.log("insufficient Balance");
    process.exit(0);
  }
};


const inputAmount = async () => {
  const withdrawal = await inquirer.prompt([
    {
      type: "list",
      name: "amount",
      message:  "Choose amount you want withdraw",
      choices : [1000,5000,10000,15000,20000,"other"]
    },
  ]);
  let amount = withdrawal.amount
  if (amount == "other") {
    const uwithdrawal = await inquirer.prompt([
      {
        type: "number",
        name: "amount",
        message: "Enter the amount you withdraw",  
      },
    ]);
    amount = uwithdrawal.amount
  }
  return amount;
};

const output = async (id: string, pin: string) => {
  const matchPin = pin.match(/^1234$/);
  if (!matchPin) {
    console.log("Pls renter the pin and userid corectly");
    await welcome();
  } else {
    const amount: number = await inputAmount();
    const uBalance = await checkBalance(amount);
    console.log(`Your remaining balance is $${uBalance}`);
  }
};

await welcome();

