#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
const sleep = (ms = 2500) => new Promise((r) => setTimeout(r, ms));
let point = 0;
const question1 = async () => {
    const answer = await inquirer.prompt({
        name: "question1",
        type: "list",
        // #9E3C0E : Rusty Brown
        message: chalk.bold.hex(`#9E3C0E`)("What is the TypeScript keyword used to declare a class property that should not be accessed from outside the class?\n"),
        choices: ["private", "protected", "readonly", "static"],
    });
    answer.question1 === "private" ? (point += 1) : null;
    await sleep();
    await question2();
};
const question2 = async () => {
    const answer = await inquirer.prompt({
        name: "question2",
        type: "list",
        message: chalk.bold.hex(`#9E3C0E`)("In TypeScript, what is the purpose of the 'readonly' modifier for class properties?\n"),
        choices: [
            "It makes the property immutable after initialization.",
            "It allows the property to be accessed from outside the class.",
            "It indicates that the property can be changed by subclass methods.",
            "It enforces that the property must have a default value.",
        ],
    });
    answer.question2 === "It makes the property immutable after initialization."
        ? (point += 1)
        : null;
    await sleep();
    await question3();
};
const question3 = async () => {
    const answer = await inquirer.prompt({
        name: "question3",
        type: "list",
        message: chalk.bold.hex(`#9E3C0E`)("Which TypeScript feature allows you to define a type based on the shape of an existing object?\n"),
        choices: [
            "Generics",
            "Interfaces",
            "Type assertions",
            "Discriminated unions",
        ],
    });
    answer.question3 === "Interfaces" ? (point += 1) : null;
    await sleep();
    await question4();
};
const question4 = async () => {
    const answer = await inquirer.prompt({
        name: "question4",
        type: "list",
        message: chalk.bold.hex(`#9E3C0E`)("In TypeScript, what is the purpose of the 'never' type?\n"),
        choices: [
            "It represents a value that is always undefined.",
            "It is used for optional function parameters.",
            "It indicates that a function never returns a value or always throws an error.",
            "It allows circular references in type definitions.",
        ],
    });
    answer.question4 ===
        "It indicates that a function never returns a value or always throws an error."
        ? (point += 1)
        : null;
    await sleep();
    await question5();
};
const question5 = async () => {
    const answer = await inquirer.prompt({
        name: "question5",
        type: "list",
        message: chalk.bold.hex(`#9E3C0E`)("Which of the following TypeScript operators is used for combining two or more types into a single type?\n"),
        choices: [
            "& (Intersection)",
            "| (Union)",
            "= (Assignment)",
            ": (Type annotation)",
        ],
    });
    answer.question5 === "& (Intersection)" ? (point += 1) : null;
    await sleep();
    await question6();
};
const question6 = async () => {
    const answer = await inquirer.prompt({
        name: "question6",
        type: "list",
        message: chalk.bold.hex(`#9E3C0E`)("What does the 'keyof' operator return in TypeScript?\n"),
        choices: [
            "The values of an object's properties",
            "The keys (property names) of an object type",
            "The values of an array",
            "The length of a string",
        ],
    });
    answer.question6 === "The keys (property names) of an object type"
        ? (point += 1)
        : null;
    await sleep();
    await question7();
};
const question7 = async () => {
    const answer = await inquirer.prompt({
        name: "question7",
        type: "list",
        message: chalk.bold.hex(`#9E3C0E`)("In TypeScript, which of the following is a valid way to declare a function that accepts a callback function with two parameters of any type?\n"),
        choices: [
            "(callback: Function) => void",
            "(callback: (a: T, b: U) => void) => void",
            "(callback: (a: any, b: any) => void) => void",
            "(callback: (a: unknown, b: unknown) => void) => void",
        ],
    });
    answer.question7 === "(callback: (a: any, b: any) => void) => void"
        ? (point += 1)
        : null;
    await sleep();
    await question8();
};
const question8 = async () => {
    const answer = await inquirer.prompt({
        name: "question8",
        type: "list",
        message: chalk.bold.hex(`#9E3C0E`)("What is a 'mapped type' in TypeScript used for?\n"),
        choices: [
            "Creating a union of types",
            "Transforming the properties of an existing type",
            "Checking for null and undefined values",
            "Defining recursive data structures",
        ],
    });
    answer.question8 === "Transforming the properties of an existing type"
        ? (point += 1)
        : null;
    await sleep();
    await question9();
};
const question9 = async () => {
    const answer = await inquirer.prompt({
        name: "question9",
        type: "list",
        message: chalk.bold.hex(`#9E3C0E`)("What is the purpose of the TypeScript 'as' keyword?\n"),
        choices: [
            "It declares a new variable.",
            "It defines a type assertion.",
            "It specifies a default value for a function parameter.",
            "It is used to create arrow functions.",
        ],
    });
    answer.question9 === "It defines a type assertion." ? (point += 1) : null;
    await sleep();
    await question10();
};
const question10 = async () => {
    const answer = await inquirer.prompt({
        name: "question10",
        type: "list",
        message: chalk.bold.hex(`#9E3C0E`)("What is the recommended way to enforce strict null checks in TypeScript?\n"),
        choices: [
            "Use the '--strict' compiler flag.",
            "Use the '--noImplicitAny' compiler flag.",
            "Use the '!' operator after variables.",
            "Use the '--strictNullChecks' compiler flag.",
        ],
    });
    answer.question10 === "Use the '--strictNullChecks' compiler flag."
        ? (point += 1)
        : null;
};
const runQuiz = async () => {
    const Title = chalkAnimation.rainbow("Welcome to the TypeScript Quiz!\n");
    await sleep();
    Title.stop();
    await question1();
    const spinner = createSpinner("Checking answer...").start();
    await sleep(1500);
    console.clear();
    spinner.success({ text: `You obtained ${point}` });
};
console.clear();
await runQuiz();
