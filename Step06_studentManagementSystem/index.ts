#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const startapp = async () => {
  console.clear();
  console.log(`
    ${chalk.bgMagenta("Student Management System")}\n
    Welcome to the Student Management System.
    This system allows you to manage student information, enrollement and tuition fees.
  `);
  await sleep();
  mainMenu();
};
class Student {
  name: string;
  id: number;
  course: string;
  balance: number;
  status: string;
  constructor(name: string, id: number, enrolledCourse: string) {
    this.name = name;
    this.id = id;
    this.status = "unpaid";
    this.course = enrolledCourse;
    this.balance = 10000;
  }

  payFees(paymentAmount: number) {
    this.balance -= paymentAmount;
    if (this.balance <= 0) {
      this.status = "paid";
      console.log(
        `Fees successfully paid. Remaining balance: $${Math.abs(this.balance)}`
      );
    } else {
      console.log(`Your remaining fees: $${this.balance}`);
    }
  }

  showStatus() {
    console.log(`
      Student Name: ${this.name}
      Student ID: ${this.id}
      Student Courses Enrolled: ${this.course}
      fee status: ${this.status}
    `);
  }

  getBalance(): number {
    return this.balance;
  }
}

const mainMenu = async () => {
  const userInput = await inquirer.prompt([
    {
      message: "Welcome to the Student Management System",
      type: "list",
      name: "menu",
      choices: ["Register New Student", "Existing Student", "Exit"],
    },
  ]);
  switch (userInput.menu) {
    case "Register New Student":
      await registerNewStudent();
      break;
    case "Existing Student":
      await manageStudent();
      break;
    case "Exit":
      console.log("Goodbye!");
      process.exit(0);
  }
};

async function registerNewStudent() {
  const name = await getStudentName();
  const courseInput = await inquirer.prompt([
    {
      message: "Choose a course to enroll",
      type: "list",
      name: "course",
      choices: [
        "Computer Science",
        "Business",
        "Medicine",
        "Engineering",
        "Arts",
      ],
    },
  ]);
  const studentID = await generateStudentID();
  const student = new Student(name, studentID, courseInput.course);
  const paymentAmount = await payFees(student);
  console.log(chalk.redBright(`Your student ID is: ${studentID}`));
  student.showStatus();
}

async function generateStudentID(): Promise<number> {
  let id = 9999;
  return ++id;
}

async function manageStudent() {
  const name = await getStudentName();
  const courseInput = await inquirer.prompt([
    {
      message: "Choose the course you are currently enrolled in",
      type: "list",
      name: "course",
      choices: [
        "Computer Science",
        "Business",
        "Medicine",
        "Engineering",
        "Arts",
      ],
    },
    {
      message: "Enter your 5-digit student ID",
      type: "number",
      name: "id",
      validate: (input) => {
        if (input > 9999 && input < 99999) {
          return true;
        } else {
          return "Invalid entry. Please enter a 5-digit student ID.";
        }
      },
    },
  ]);
  const student = new Student(name, courseInput.id, courseInput.course);
  const selectedAction = await getMenuOption();
  switch (selectedAction) {
    case "View Fees Dues":
      console.log(`Fees due: $${student.getBalance()}`);
      break;
    case "Pay Student Tuition Fees":
      await payFees(student);
      break;
    case "Show Student Status":
      student.showStatus();
      break;
  }
}

async function getStudentName(): Promise<string> {
  const input = await inquirer.prompt([
    {
      message: "Please enter your name:",
      type: "input",
      name: "name",
      validate: (input) => {
        if (input) {
          return true;
        } else {
          return "Please enter your name.";
        }
      },
    },
  ]);
  return input.name;
}

async function getMenuOption(): Promise<string> {
  const input = await inquirer.prompt([
    {
      message: "Select an action:",
      type: "list",
      name: "menu",
      choices: [
        "View Fees Dues",
        "Pay Student Tuition Fees",
        "Show Student Status",
      ],
    },
  ]);
  return input.menu;
}

async function getPaymentAmount(): Promise<number> {
  let validInput = false;
  let paymentAmount: number = 0;

  while (!validInput) {
    const input = await inquirer.prompt([
      {
        message: "Deposit tuition fee $10,000 :",
        type: "number",
        name: "fee",
      },
    ]);
    paymentAmount = input.fee;

    if (paymentAmount >= 10000) {
      validInput = true;
    } else {
      console.log("You can only deposit the full tuition fee: $10,000");
    }
  }
  return paymentAmount;
}

async function payFees(student: Student) {
  const paymentAmount = await getPaymentAmount();
  student.payFees(paymentAmount);
}

startapp();
