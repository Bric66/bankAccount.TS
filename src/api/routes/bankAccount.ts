import express from "express";
const bankAccountRouter = express.Router();

import {InMemoryBankAccountRepository} from "../../adapters/repositories/InMemoryBankAccountRepository";
import {InMemoryProfileRepository} from "../../adapters/repositories/InMemoryProfileRepository";
import {CreateBankAccount} from "../../core/usecases/bankAccount/CreateBankAccount";
import {CheckIfProfileExistsById} from "../../core/usecases/profile/CheckIfProfileExistsById";
import {CheckIfBankAccountExists} from "../../core/usecases/bankAccount/CheckIfBankAccountExists";
import {RecapBankAccountByIban} from "../../core/usecases/bankAccount/RecapBankAccountByIban";

const profileRepository = new InMemoryProfileRepository();
const bankAccountRepository = new InMemoryBankAccountRepository();
const createBankAccount = new CreateBankAccount(bankAccountRepository)
const checkIfProfileExistsById = new CheckIfProfileExistsById(profileRepository)
const checkIfBankAccountExists = new CheckIfBankAccountExists(bankAccountRepository)
const recapBankAccountByIban = new RecapBankAccountByIban(bankAccountRepository,profileRepository)

bankAccountRouter.post("/", (req, res) => {
    const body = {
        profileUuid: req.body.UUID,
    };

    checkIfProfileExistsById.execute(body, res);

    createBankAccount.execute(body, res);
});

bankAccountRouter.get("/:iban", (req, res) => {

    checkIfBankAccountExists.execute(req, res);

    recapBankAccountByIban.execute(req, res);

});

export {bankAccountRouter};
