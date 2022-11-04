type ProfileProperties = {
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  profileUuid: string;
};

export class Profile {
  props: ProfileProperties;

  constructor(props: ProfileProperties) {
    this.props = props;
  }
}
