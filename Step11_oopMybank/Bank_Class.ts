import chalk from "chalk";

class BankAccount {
  private balance: number;
  constructor(Balance: number = 100) {
    this.balance = Balance;
  }
  Debit(amount: number) {
    if (amount > this.balance) {
      console.log(
        chalk.bold.hex(
          `#DD4124`
        )`Your transaction cannot be fulfilled as you have insifficent Balance`
      );
    } else if (amount > 0) {
      this.balance -= amount;
      console.log(
        chalk.bold.hex(`#EFC050`)(
          `transaction fulfilled \nremaining Balance:${this.balance}`
        )
      );
    }
  }
  Credit(amount: number) {
    if (amount > 0) {
      this.balance += amount;
      if (amount > 100) {
        this.balance -= 1;
      }
      console.log(
        chalk.bold.hex(`#EFC050`)(`Your account has been credited successfully`)
      );
    }
  }
  get getBalance() {
    return this.balance;
  }
}

export default BankAccount;