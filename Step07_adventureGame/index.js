#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { randomInt } from "crypto";
import chalkAnimation from "chalk-animation";
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
class Player {
    name;
    health;
    attack;
    potion;
    constructor(name) {
        this.name = name;
        this.name = name;
        this.attack = this.getattack;
        this.health = randomInt(60, 150);
        this.potion = 1;
    }
    get getattack() {
        this.attack = randomInt(5, 30);
        return this.attack;
    }
    set setpotion(reward) {
        this.potion += reward;
    }
    usepotion() {
        if (this.potion > 0) {
            this.health += 40;
            this.potion -= 1;
            console.log(`After drinking potion ${this.name} health increses to ${this.health}`);
        }
        else {
            console.log(`There is no potion available`);
        }
    }
    flee() {
        const chance = randomInt(30, 100);
        if (chance < 60) {
            this.health -= 30;
            console.log(`You attempted to flee, but the ${chalk.red("enemy")} caught up with you and dealt 30 damage.`);
            return false;
        }
        else {
            console.log(`You successfully fled from the ${chalk.green("enemy")}.`);
            return true;
        }
    }
}
class Enemy {
    health;
    attack;
    name;
    constructor() {
        const enemyNames = [
            "Skeleton",
            "Assassin",
            "Mage",
            "Goblin",
            "Orc",
        ];
        const randomIndex = randomInt(0, enemyNames.length - 1);
        this.name = enemyNames[randomIndex];
        this.health = randomInt(30, 100);
        this.attack = randomInt(10, 25);
    }
}
const askName = async () => {
    const answers = await inquirer.prompt({
        name: "player_name",
        type: "input",
        message: "What is your name?",
        default() {
            return "Player";
        },
    });
    const playerName = answers.player_name;
    return story(playerName);
};
const story = async (playerName) => {
    const user = new Player(playerName);
    console.clear();
    chalkAnimation.rainbow(`Welcome, ${playerName}, to the mystical world of adventures and challenges.\n`);
    await sleep(2000);
    console.log(chalk.bold.cyanBright(`You find yourself in a dense forest, surrounded by tall, ancient trees.`));
    await sleep(1500);
    console.log(chalk.bold.cyanBright(`As you venture deeper into the forest, you come across a mysterious cave entrance.`));
    await sleep(1500);
    console.log(chalk.bold.cyanBright(`Curiosity gets the best of you, and you decide to explore the cave.\n`));
    await sleep(1500);
    console.log(`${chalk.bold.yellow(`Inside the cave, you discover an old chest filled with potions and treasures.`)}
${chalk.bold.yellowBright(`You obtained ${chalk.bold("a health potion")}`)}\n`);
    await sleep(1500);
    console.log(chalk.bold.cyanBright(`Little did you know that your journey was just beginning.`));
    await sleep(1500);
    console.log(chalk.bold.cyanBright(`As you exit the cave, a shadowy figure emerges from the darkness.`));
    await sleep(1500);
    console.log(chalk.bold.red(`It's a ${chalk.redBright("dangerous enemy")} looking for a fight.`));
    await sleep(1500);
    console.log(chalk.bold.cyanBright(`Prepare yourself, ${playerName}, for the battle of your life!`));
    await sleep(1500);
    console.log(`${chalk.bold.cyanBright(`Let the game begin!`)}\n
..................`);
    await sleep(2000);
    await play(user);
};
const play = async (user) => {
    const enemy = new Enemy();
    console.log(`${chalk.bold.green(`${user.name} health: ${user.health}`)}
${chalk.bold.red(`A ${enemy.name} appears with health: ${enemy.health}`)}
------------------------------\n`);
    while (user.health >= 0 && enemy.health >= 0) {
        let userAttack = user.getattack;
        let enemyAttack = enemy.attack;
        await sleep(1000);
        const choice = await choices();
        await sleep();
        switch (choice) {
            case "Attack": {
                user.health -= enemyAttack;
                enemy.health -= userAttack;
                if (user.health <= 0) {
                    console.log(`${user.name} has died`);
                    break;
                }
                else if (enemy.health <= 0) {
                    user.potion += 2;
                    console.log(`
          ${chalk.bold.red(`${enemy.name} is defeated`)}
          ${chalk.bold.yellow(`The ${enemy.name} droped 2 Bottle of health potions and 20 Gold coins`)}
          `);
                    break;
                }
                else {
                    console.log(`
          ${chalk.bold
                        .red(`You strike the ${enemy.name} for ${userAttack} damage 
          ${enemy.name} retaliated with ${enemyAttack} damage`)}
          ${chalk.bold.yellow(`${user.name} health: ${user.health}
          ${enemy.name} health: ${enemy.health}`)}\n`);
                    break;
                }
            }
            case "Drink health potion": {
                user.usepotion();
                break;
            }
            case "flee": {
                let con = user.flee();
                if (con) {
                    await end(user);
                }
                break;
            }
        }
    }
    await end(user);
};
const choices = async () => {
    const answers = await inquirer.prompt({
        name: "option",
        type: "list",
        message: "What would you like to do ?",
        choices: ["Attack", "Drink health potion", "flee"],
    });
    const choice = answers.option;
    return choice;
};
const end = async (user) => {
    const answers = await inquirer.prompt({
        name: "option",
        type: "list",
        message: "What would you like to do ?",
        choices: ["continue", "Exit"],
    });
    if (answers.option == "continue") {
        await play(user);
    }
    else {
        process.exit(0);
    }
};
await askName();
