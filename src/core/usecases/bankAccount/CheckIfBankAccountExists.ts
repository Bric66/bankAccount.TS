import {BankAccountRepository} from "../../repositories/BankAccountRepository";

export class CheckIfBankAccountExists {
    bankAccountRepository: BankAccountRepository;

    constructor(bankAccountRepository: BankAccountRepository) {
        this.bankAccountRepository = bankAccountRepository;
    }

    execute(request, response) {
        const isBankAccountExist = this.bankAccountRepository.getByIban(
            request.params.iban
        ).props;

        if (!isBankAccountExist) {
            return response.status(400).send({
                message: "Bank Account doesn't exist",
            });
        }
    }


}

