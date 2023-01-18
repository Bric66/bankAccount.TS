import express from "express";
const profileRouter = express.Router();
import {InMemoryProfileRepository} from "../../adapters/repositories/InMemoryProfileRepository";
import {CreateProfile} from "../../core/usecases/profile/CreateProfile";
import {CheckIfProfileExistsByMailAndPhone} from "../../core/usecases/profile/CheckIfProfileExistsByMailAndPhone";

const profileRepository = new InMemoryProfileRepository();
const createProfile = new CreateProfile(profileRepository);
const checkIfProfileExistsByMailAndPhone = new CheckIfProfileExistsByMailAndPhone(profileRepository);

profileRouter.post("/", (req, res) => {
    const body = {
        lastName: req.body.lastName.toLowerCase().trim(),
        firstName: req.body.firstName.toLowerCase().trim(),
        email: req.body.email.toLowerCase().trim(),
        phoneNumber: req.body.phoneNumber,
    };
    checkIfProfileExistsByMailAndPhone.execute(body, res);

    createProfile.execute(body, res);


});

export {profileRouter};
