import chalk from "chalk";
import BankAccount from "./Bank_Class.js";

class Customer {
  public BankAccount;
  constructor(
    protected firstName: string,
    protected lastName: string,
    protected gender: string,
    protected age: number,
    protected mobileNumber: string
  ) {
    this.BankAccount = new BankAccount();
  }
  get getCustomerInfo(): string {
    return `Name: ${chalk.bold.hex(`#EFC050`)(
      `${this.firstName},${this.lastName}`
    )}
    Age: ${chalk.bold.hex(`#EFC050`)(`${this.age}`)}
    Gender: ${chalk.bold.hex(`#EFC050`)(`${this.gender}`)}
    Mobile Number: ${chalk.bold.hex(`#EFC050`)(
      `${this.mobileNumber.padStart(1, "0")}`
    )}
    Account: ${chalk.bold.hex(`##EFC050`)(`${this.BankAccount.getBalance}`)}`;
  }
}

export default Customer;
