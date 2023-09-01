#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

const sleep = (ms = 2500) => new Promise((r) => setTimeout(r, ms));
const startapp = async () => {
  console.clear();
  console.log(`
  ${chalk.bgYellowBright(
    "Welcome to the TODO-List App! This app helps you manage your tasks efficiently"
  )}\n
  ${chalk.bold("Instructions:")}\n
  1. Enter your tasks one by one. Press Enter after each task.\n
  2. To finish entering tasks, simply press Enter without typing anything.\n
  3. Your entered tasks will be displayed.\n
  4. If no tasks are entered the program will be terminated
  Get organized and stay productive with this simple TODO-list app!\n
  `);
  await sleep();
  userInput();
};

const userInput = async () => {
  let userData: string[] = [];
  let flag = false;
  while (flag == false) {
    const input = await inquirer.prompt([
      {
        message: "Todos:",
        type: "input",
        name: "to",
      },
    ]);
    let todos = input.to;
    if (todos == "") {
      flag = true;
    } else {
      flag = false;
      userData.push(todos);
    }
  }
  if (userData.length == 0) {
    process.exit(0);
  } else {
    return operation(userData);
  }
};

const deleteTask = (userData: string[], index: number) => {
  userData.splice(index - 1, 1);
  return userData;
};
const operation = async (userData: string[]) => {
  const op = await inquirer.prompt([
    {
      message: "Do want to Delete any tasks in todo list?",
      type: "list",
      name: "choice",
      choices: ["Yes", "No"],
    },
  ]);
  if (op.choice == "Yes") {
    const index = await inquirer.prompt([
      {
        name: "i",
        type: "number",
        message: `Enter the task number 1-${userData.length}`,
      },
    ]);
    const data = deleteTask(userData, index.i);
    output(data);
  } else {
    output(userData);
  }
};
const output = (userData: string[]) => {
  userData.forEach((tasks, index) => {
    console.log(`${index + 1}.${tasks}`);
  });
};

await startapp();
