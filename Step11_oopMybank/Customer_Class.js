import chalk from "chalk";
import BankAccount from "./Bank_Class.js";
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    BankAccount;
    constructor(firstName, lastName, gender, age, mobileNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.BankAccount = new BankAccount();
    }
    get getCustomerInfo() {
        return `Name: ${chalk.bold.hex(`#EFC050`)(`${this.firstName},${this.lastName}`)}
    Age: ${chalk.bold.hex(`#EFC050`)(`${this.age}`)}
    Gender: ${chalk.bold.hex(`#EFC050`)(`${this.gender}`)}
    Mobile Number: ${chalk.bold.hex(`#EFC050`)(`${this.mobileNumber.padStart(1, "0")}`)}
    Account: ${chalk.bold.hex(`##EFC050`)(`${this.BankAccount.getBalance}`)}`;
    }
}
export default Customer;
