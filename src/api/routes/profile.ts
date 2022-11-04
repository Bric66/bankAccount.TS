import express from "express";
import { Profile } from "../../core/entities/Profile";
const profileRouter = express.Router();
import { v4 as uuidv4 } from "uuid";
import { InMemoryProfileRepository } from "../../adapters/repositories/InMemoryProfileRepository";

const profileRepository = new InMemoryProfileRepository();

profileRouter.post("/", (req, res) => {
  const body = {
    lastName: req.body.lastName.toLowerCase().trim(),
    firstName: req.body.firstName.toLowerCase().trim(),
    email: req.body.email.toLowerCase().trim(),
    phoneNumber: req.body.phoneNumber,
  };
  const isProfileExist = profileRepository.exist(body.email, body.phoneNumber);
  if (isProfileExist) {
    return res.status(400).send({
      message: "Profile already exists",
    });
  }

  const profileUuidNumber = uuidv4();

  const profile = new Profile({
    lastName: body.lastName,
    firstName: body.firstName,
    email: body.email,
    phoneNumber: body.phoneNumber,
    profileUuid: profileUuidNumber,
  });

  profileRepository.save(profile);

  return res.status(200).send(profile);
});

export { profileRouter };
