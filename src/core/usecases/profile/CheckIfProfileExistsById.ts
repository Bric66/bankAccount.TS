import {ProfileRepository} from "../../repositories/ProfileRepository";


export class CheckIfProfileExistsById {
    profileRepository: ProfileRepository;

    constructor(profileRepository: ProfileRepository) {
        this.profileRepository = profileRepository;
    }

    execute(body, response) {
        const isProfileExist = this.profileRepository.getById(body.profileUuid);

        if (!isProfileExist) {
            return response.status(400).send({
                message: "You need a profile to create a Bank Account",
            });
        }
    }


}
