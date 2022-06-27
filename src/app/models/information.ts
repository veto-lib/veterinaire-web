export interface IInformation {
  firstName: string;
  lastName: string;
  price: string;
  address: string;
}

export class Information {

  static fromApi(information: IInformation): IInformation {
    return {
      firstName: information.firstName,
      lastName: information.lastName,
      price: information.price,
      address: information.address,
    };
  }

}
