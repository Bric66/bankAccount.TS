import { Profile } from "../entities/Profile";

export interface ProfileRepository {
  save(profile: Profile): void;
  getById(profileUuid: string): Profile;
  exist(email: string, phoneNumber: string): boolean;
}
