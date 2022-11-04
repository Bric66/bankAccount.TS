type BankAccountProperties = {
  profileUuid: string;
  iban: string;
  bic: string;
};

export class BankAccount {
  props: BankAccountProperties;

  constructor(props: BankAccountProperties) {
    this.props = props;
  }
}
