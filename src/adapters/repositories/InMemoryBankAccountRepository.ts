import { BankAccount } from "../../core/entities/BankAccount";
import { BankAccountRepository } from "../../core/repositories/BankAccountRepository";

const dbBankAccount = new Map();

export class InMemoryBankAccountRepository implements BankAccountRepository {
  save(bankAccount: BankAccount): void {
    dbBankAccount.set(bankAccount.props.iban, bankAccount);
  }
  getByIban(iban: string): BankAccount {
    return dbBankAccount.get(iban);
  }
}
