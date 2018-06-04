export interface Vendor{
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
    countryCode: string,
    phoneNo: string,
    type: string,
    preference?: string
  }[],
  email: {
    email: string,
    type: string,
    preference?: string
  }[],
  company: {
    companyName: string,
    prefferedName: string,
    regNo: string,
    vatRegNo: string,
    insurance: string,
    qualifications: string,
    categories: string
  }
}