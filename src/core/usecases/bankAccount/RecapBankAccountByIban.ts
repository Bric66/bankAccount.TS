import {BankAccountRepository} from "../../repositories/BankAccountRepository";
import {ProfileRepository} from "../../repositories/ProfileRepository";

export class RecapBankAccountByIban {
    bankAccountRepository: BankAccountRepository;
    profileRepository: ProfileRepository;

    constructor(bankAccountRepository: BankAccountRepository,
                profileRepository: ProfileRepository
    ) {
        this.bankAccountRepository = bankAccountRepository;
        this.profileRepository = profileRepository;
    }

    execute(request, response) {
        const isBankAccountExist = this.bankAccountRepository.getByIban(
            request.params.iban
        ).props;

        const profile = this.profileRepository.getById(
            isBankAccountExist.profileUuid
        ).props;

        //const visualBankAccount = Object.assign({}, profile, isBankAccountExist);

        return response.status(200).send({
            profile: profile,
            bank_account: isBankAccountExist
        });
    }


}