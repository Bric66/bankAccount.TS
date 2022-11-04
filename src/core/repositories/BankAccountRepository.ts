import { BankAccount } from "../entities/BankAccount";

export interface BankAccountRepository {
  save(profile: BankAccount): void;
  getByIban(profileUuid: string): BankAccount;
}
