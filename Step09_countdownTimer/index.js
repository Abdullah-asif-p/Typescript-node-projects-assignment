#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const sleep = (ms = 4000) => new Promise((r) => setTimeout(r, ms));
const startapp = async () => {
    process.stdout.clearLine(0);
    console.log(`
    ${chalk.bold.hex(`#FFFF00`)(`Welcome to the Countdown Timer application! This simple tool allows you to set a countdown timer with a specified duration.\n
    To get started, please enter the countdown duration in the following format: ${chalk.bold.hex(`#DD4124`)(`minutes:seconds`)}
    For example, if you want to set a timer for 10 minutes and 30 seconds, you should enter: ${chalk.bold.hex(`#DD4124`)(`10:30`)}
    Make sure to ${chalk.bold.hex(`#DD4124`)(`use two digits for both minutes and seconds`)}, and separate them with a colon. You can set a timer for any duration you like.\n
    Once you've entered the duration, the timer will start, and you'll see the countdown in the console. When the timer reaches zero, it will display the ending time.
    Let's get started! Please enter the countdown duration below:`)}
  `);
    await sleep();
    await countdownTime();
};
const countdownTime = async () => {
    const action = await inquirer.prompt([
        {
            type: "input",
            name: "op",
            message: `Enter countdown duration format ${chalk.bold.hex(`#DD4124`)(`mins:seconds, 10:01`)}`,
            validate(input) {
                const pattern = /^\d+:[0-5]{1}[0-9]{1}$/;
                if (pattern.test(input)) {
                    return true;
                }
                else {
                    return "Invalid format. Please enter a valid duration in the format mins:seconds, e.g., 01:01";
                }
            },
        },
    ]);
    let time = String(action.op).split(":");
    let min = Number(time[0]);
    let seconds = Number(time[1]);
    start();
    await timer(min, seconds);
};
const start = async () => {
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    console.log(chalk.bold.hex(`#71C562`)(`The starting time is  ${hours}:${minutes}:${seconds}`));
};
const end = () => {
    let dateob = new Date();
    let hours = dateob.getHours();
    let minutes = dateob.getMinutes();
    let seconds = dateob.getSeconds();
    console.log(chalk.bold.hex(`#71C562`)(`The Ending time is ${hours}:${minutes}:${seconds}`));
};
const timer = async (min, second) => {
    const interval = setInterval(() => {
        second == 0 && min != 0 ? (min--, (second = 60)) : null;
        second--;
        process.stdout.cursorTo(0);
        process.stdout.write(chalk.bold.hex(`#EFC050`)(`${String(min).padStart(2, "0")}:${String(second)}`));
        min == 0 && second == 0
            ? (process.stdout.clearLine(0),
                clearInterval(interval),
                console.log(),
                end())
            : null;
    }, 1000);
};
await startapp();
