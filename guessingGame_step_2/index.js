#! /usr/bin/env node
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import inquirer from "inquirer";
import { randomInt } from "crypto";
import chalkAnimation from "chalk-animation";
let playerName;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const welcome = async () => {
    console.clear();
    const rainbowTitle = chalkAnimation.rainbow(" ____The Gueesing Game____");
    await sleep();
    rainbowTitle.stop();
    console.log(`
    ${chalk.bgBlue("Info about this GUESS GAME")}
    ${chalk.yellow("Winnings for game is $1000")} 
    Numeber will be chosen randomly form 1 till 240
    If you get the guess wrong the you will be ${chalk.bgRed("killed")}
    You can try again indefinitely but each time the number will changed 
    `);
    await sleep();
    await name();
    await input_num();
};
const name = async () => {
    const answer = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: chalk.gray("What is your name?"),
            default() {
                return "Player";
            },
        },
    ]);
    playerName = answer.player_name;
};
const input_num = async (name) => {
    const answer = await inquirer.prompt([
        {
            message: chalk.green("Guess the number:"),
            name: "num",
            type: "number",
        },
    ]);
    return check_answer(answer.num);
};
const operations = async () => {
    const operation = await inquirer.prompt([
        {
            message: "Do you want to try again or Exit game",
            name: "op",
            type: "list",
            choices: ["Try Again", "Exit"],
        },
    ]);
    operation.op == "Try Again" ? welcome() : process.exit(0);
};
const check_answer = async (num) => {
    const value = isNaN(num);
    if (value == true) {
        console.log("wrong input, make sure you enter number");
        operations();
    }
    else {
        const guessNumber = randomInt(1, 240);
        const result = guessNumber == num;
        const spinner = createSpinner("Checking answer...").start();
        await sleep(1000);
        if (result) {
            spinner.success({
                text: `Nice work ${playerName}. That's the correct answer`,
            });
            console.log(`🎉🎉🎉${chalk.bgYellowBright("Congratulations you have won $1000")}🎉🎉🎉`);
        }
        else {
            spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
            operations();
        }
    }
};
await welcome();
