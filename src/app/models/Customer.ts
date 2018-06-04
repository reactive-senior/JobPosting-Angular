export interface Customer {
  userName: string,
  password: string,
  firstName: string,
  lastName: string,
  address: {
    addressLine1: string,
    addressLine2: string,
    city: string,
    state: string,
    country: string,
    postalCode: string,
    type: string
  }[],
  phone: {
    countryCode: number,
    phoneNo: number,
    type: string,
    preference?: string
  }[],
  email: {
    email: string,
    type: string,
    preference?: string
  }[]
}