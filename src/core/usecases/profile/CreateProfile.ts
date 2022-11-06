import {v4 as uuidv4} from "uuid";
import {Profile} from "../../entities/Profile";
import {ProfileRepository} from "../../repositories/ProfileRepository";

export class CreateProfile{
    profileRepository:ProfileRepository;

    constructor(profileRepository:ProfileRepository) {
        this.profileRepository = profileRepository;
    }
    execute(body,response){
        
        const profileUuidNumber = uuidv4();

        const profile = new Profile({
            lastName: body.lastName,
            firstName: body.firstName,
            email: body.email,
            phoneNumber: body.phoneNumber,
            profileUuid: profileUuidNumber,
        });

        this.profileRepository.save(profile);
        return response.status(200).send(
            profile
        );
    }
}

