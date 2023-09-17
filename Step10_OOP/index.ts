import inquirer from "inquirer";
import chalk from "chalk";

class Person {
  private Personality: string;
  constructor() {
    this.Personality = "Mystery";
  }
  askquestion(answer: number) {
    answer == 1
      ? (this.Personality = "Extrovert")
      : answer == 2
      ? (this.Personality = "Introvert")
      : (this.Personality = "Mystery");
  }
  get getPersonality() {
    return this.Personality;
  }
}

class Student extends Person {
  constructor(private name: string) {
    super();
  }
  get getName(): string {
    return this.name;
  }
}

const askName = async () => {
  const inputName = await inquirer.prompt({
    name: "name",
    type: "input",
    message: chalk.bold.hex(`#9E3C0E`)("What is your name?"),
    validate(input) {
      if (/^[A-Za-z]+$/.test(input)) {
        return true;
      } else {
        return false;
      }
    },
  });
  const Name: string = inputName.name;
  return Name;
};
const askAnswer = async () => {
  const inputAnswer = await inquirer.prompt({
    name: "ans",
    type: "list",
    message: chalk.bold.hex(`#9E3C0E`)(
      "Choose 1 if you like to talk to other Choose 2 if you would rather keep to yourself"
    ),
    choices: ["1", "2"],
  });
  const answer: number = inputAnswer.ans;
  return answer;
};
const main = async () => {
  let answer: number = Number(await askAnswer());
  let p = new Person();
  p.askquestion(answer);
  console.log(`Your are : ${p.getPersonality}`);
  let name: string = String(await askName());
  let s = new Student(name);
  console.log(
    chalk.bold.hex(`#EB8921`)(
      `\nYour name is: ${s.getName} and your are personality type is: ${s.getPersonality}`
    )
  );
};
main();
