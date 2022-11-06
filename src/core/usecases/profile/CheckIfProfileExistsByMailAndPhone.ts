import {ProfileRepository} from "../../repositories/ProfileRepository";

export class CheckIfProfileExistsByMailAndPhone {
    profileRepository: ProfileRepository;

    constructor(profileRepository: ProfileRepository) {
        this.profileRepository = profileRepository;
    }

    execute(body, response) {
        const isProfileExist = this.profileRepository.exist(body.email, body.phoneNumber);
        if (isProfileExist) {
            return response.status(400).send({
                message: "Profile already exists",
            })
        }
    }


}

