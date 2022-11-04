import { Profile } from "../../core/entities/Profile";
import { ProfileRepository } from "../../core/repositories/ProfileRepository";

const dbProfile = new Map();

export class InMemoryProfileRepository implements ProfileRepository {
  exist(email: string, phoneNumber: string): boolean {
    const values = Array.from(dbProfile.values());
    const profile = values.find(
      (elem) =>
        elem.props.email === email || elem.props.phoneNumber === phoneNumber
    );
    if (profile) {
      return true;
    }
    return false;
  }

  save(profile: Profile): void {
    dbProfile.set(profile.props.profileUuid, profile);
  }

  getById(profileUuid: string): Profile {
    return dbProfile.get(profileUuid);
  }
}
