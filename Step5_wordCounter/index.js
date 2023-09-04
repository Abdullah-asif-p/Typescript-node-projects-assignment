#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const startapp = async () => {
    console.clear();
    console.log(`${chalk.yellowBright("\t Welcome to the Text Analysis App!")}\n
This app helps you analyze text input by counting the number of words and characters in it.
  `);
    await sleep();
    await userInput();
};
const userInput = async () => {
    const input = await inquirer.prompt({
        type: "input",
        name: "user",
        message: "Enter your text",
    });
    const userData = String(input.user).trim();
    output(userData);
};
const output = (Data) => {
    let words = Data.split(" ");
    let str = Data.replace(/\s/g, "");
    console.log(`text contains ${chalk.yellowBright(words.length)} words and ${chalk.yellowBright(str.length)} characters`);
};
startapp();
