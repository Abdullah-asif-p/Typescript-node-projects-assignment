#!/usr/bin/env node

import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import chalk from "chalk";
import { exit, exitCode } from "process";

const sleep = (ms = 1500) => new Promise((r) => setTimeout(r, ms));

const welcome = async () => {
  const rainbowTitle = chalkAnimation.rainbow(" ____Calculator____ \n");
  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO OPERATE CALCULATOR ")} 
    The calculator take only two inputs.
    +: stand for ${chalk.green("Addition")} operations
    -: stand for ${chalk.green("Subtraction")} operations
    *: stand for ${chalk.green("Multiplication")} operations
    /: stand for ${chalk.green("Division")} operations
    `);
  await sleep ()
  await Start_op();
};

const operations = async () => {
  const operation = await inquirer.prompt([
    {
      type: "list",
      name: "op",
      message: chalk.green('chose any operation'),
      choices: ["+", "-", "*", "/"],
    },
  ]);
  return operation.op;
};

const question = async () => {
  const answer = await inquirer.prompt([
    {
      message: chalk.green("first number:"),
      name: "num1",
      type: "number",
    },
    {
      message: chalk.green("second number:"),
      name: "num2",
      type: "number",
    },
  ]);
  const op = String(await operations());
  return output(answer.num1, answer.num2, op);
};

const output = async (num1: number, num2: number, op: string) => {
  let ans: number;
  switch (op) {
    case "+":
      ans = num1 + num2;
      console.log(`${chalk.bold.red("Your answer is:")} ${ans}`);
      break;
    case "-":
      ans = num1 - num2;
      console.log(`${chalk.bold.red("Your answer is:")} ${ans}`);
      break;
    case "/":
      ans = num1 / num2;
      console.log(`${chalk.bold.red("Your answer is:")} ${ans}`);
      break;
    case "*":
      ans = num1 * num2;
      console.log(`${chalk.bold.red("Your answer is:")} ${ans}`);
      break;
  }
  await sleep(2000)
  await Start_op();
};

const Start_op = async () => {
  const operation = await inquirer.prompt([
    {
      type: "list",
      name: "op",
      message: chalk.green("chose any operation"),
      choices: ["New", "Exit"],
    },
  ]);
  const op = String(operation.op);
  op === "Exit" ?  exit() : await question();
};

console.clear();
await welcome();

