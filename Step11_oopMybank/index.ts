#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import Customer from "./Customer_Class.js";

const sleep = (ms = 2500) => new Promise((r) => setTimeout(r, ms));
const newCustomer = async () => {
  const userinput = await inquirer.prompt([
    {
      type: "input",
      name: "firstname",
      message: chalk.bold.hex(`#8b3103`)("Enter firstname: "),
      validate(input) {
        const pattern = /^\w*$/;
        if (pattern.test(input)) {
          return true;
        }
      },
    },
    {
      type: "input",
      name: "lastname",
      message: chalk.bold.hex(`#8b3103`)("Enter lastname: "),
      validate(input) {
        const pattern = /^\w*$/;
        if (pattern.test(input)) {
          return true;
        }
      },
    },
    {
      type: "number",
      name: "age",
      message: chalk.bold.hex(`#8b3103`)("Enter age: "),
      validate(input) {
        const pattern = /^\d{2,3}$/;
        if (pattern.test(input)) {
          return true;
        }
      },
    },
    {
      type: "list",
      name: "gender",
      message: chalk.bold.hex(`#8b3103`)("Chooese your gender"),
      choices: ["Male", "Female", "Others"],
    },
    {
      type: "input",
      name: "mobileno",
      message: chalk.bold.hex(`#8b3103`)(`Enter mobile number: `),
      validate(input) {
        const pattern = /^\d{10,11}$/;
        if (pattern.test(input)) {
          return true;
        } else {
          return chalk.bold.hex(`#DD4124`)(
            `The mobile number must be 11 digits.`
          );
        }
      },
    },
  ]);
  let firstname: string = userinput.firstname;
  let lastname: string = userinput.lastname;
  let age: number = userinput.age;
  let gender: string = userinput.gender;
  let mobileNumber: string = String(userinput.mobileno);
  let customer = new Customer(firstname, lastname, gender, age, mobileNumber);
  return Operations(customer);
};
const credit = async (customer: Customer) => {
  const Input = await inquirer.prompt([
    {
      type: "number",
      name: "creditAmmount",
      message: chalk.bold.hex(`#8b3103`)("Enter the ammount to credit: "),
      validate(input) {
        const pattern = /^\d*$/;
        if (pattern.test(input)) {
          return true;
        }
      },
    },
  ]);
  let creditAmmount: number = Input.creditAmmount;
  customer.BankAccount.Credit(creditAmmount);
};
const debit = async (customer: Customer) => {
  const Input = await inquirer.prompt([
    {
      type: "number",
      name: "debitAmmount",
      message: chalk.bold.hex(`#8b3103`)("Enter the ammount to debit: "),
      validate(input) {
        const pattern = /^\d*$/;
        if (pattern.test(input)) {
          return true;
        }
      },
    },
  ]);
  let debitAmmount: number = Input.debitAmmount;
  customer.BankAccount.Debit(debitAmmount);
};
const op = async () => {
  const Input = await inquirer.prompt([
    {
      type: "list",
      name: "op",
      message: chalk.bold.hex(`#8b3103`)("\nChoose an operation to perform:"),
      choices: [
        "Check Balance",
        "Debit",
        "Credit",
        "Customer information",
        "Exit",
      ],
    },
  ]);
  return String(Input.op);
};
const Operations = async (customer: Customer) => {
  while (true) {
    await sleep();
    let action: string = String(await op());
    switch (action) {
      case "Check Balance":
        console.log(customer.BankAccount.getBalance);
        break;
      case "Debit":
        await debit(customer);
        process.exit(1);
      case "Credit":
        await credit(customer);
        process.exit(1);
      case "Customer information":
        console.log(customer.getCustomerInfo);
        break;
      case "Exit":
        process.exit(1);
    }
  }
};
await newCustomer();
export { newCustomer };
