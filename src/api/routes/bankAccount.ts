import express from "express";

const bankAccountRouter = express.Router();
import { v4 as uuidv4 } from "uuid";
import { InMemoryBankAccountRepository } from "../../adapters/repositories/InMemoryBankAccountRepository";
import { InMemoryProfileRepository } from "../../adapters/repositories/InMemoryProfileRepository";
import { BankAccount } from "../../core/entities/BankAccount";

const profileRepository = new InMemoryProfileRepository();
const bankAccountRepository = new InMemoryBankAccountRepository();

bankAccountRouter.post("/signup", (req, res) => {
  const body = {
    profileUuid: req.body.UUID,
  };

  const isProfileExist = profileRepository.getById(body.profileUuid);

  if (!isProfileExist) {
    return res.status(400).send({
      message: "You need a profile to create a Bank Account",
    });
  }

  const ibanNumber = uuidv4();
  const bic = (Math.random() + 1).toString(36).substring(7);
  const bankAccount = new BankAccount({
    profileUuid: body.profileUuid,
    iban: ibanNumber,
    bic: bic,
  });

  bankAccountRepository.save(bankAccount);

  return res.status(200).send(bankAccount.props);
});

bankAccountRouter.post("/signin", (req, res) => {
  const body = {
    iban: req.body.iban,
  };

  const isBankAccountExist = bankAccountRepository.getByIban(body.iban).props;

  if (!isBankAccountExist) {
    return res.status(400).send({
      message: "Bank Account doesn't exist",
    });
  }

  const profile = profileRepository.getById(
    isBankAccountExist.profileUuid
  ).props;

  const visualBankAccount = Object.assign({}, profile, isBankAccountExist);

  return res.status(200).send(visualBankAccount);
});

export { bankAccountRouter };
