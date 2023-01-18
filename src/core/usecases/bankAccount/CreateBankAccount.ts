import {v4 as uuidv4} from "uuid";
import {BankAccount} from "../../entities/BankAccount";
import {BankAccountRepository} from "../../repositories/BankAccountRepository";

export class CreateBankAccount {
    bankAccountRepository: BankAccountRepository;

    constructor(bankAccountRepository: BankAccountRepository) {
        this.bankAccountRepository = bankAccountRepository;
    }

    execute(body, response) {
        const ibanNumber = uuidv4();
        const bic = (Math.random() + 1).toString(36).substring(7);
        const bankAccount = new BankAccount({
            profileUuid: body.profileUuid,
            iban: ibanNumber,
            bic: bic,
        });

        this.bankAccountRepository.save(bankAccount);

        return response.status(200).send(bankAccount.props);
    }


}