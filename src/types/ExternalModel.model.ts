export interface Doctor {
  name: string;
  phone: string;
  gender: string;
  expertise?: string[];
  pincode?: string;
  languages_known?: string[];
  experience?: string;
  image?: string;
}
export interface User {
  __v?: number;
  _id?: string;
  email?: string;
  gender?: string;
  name?: string;
  phone?: string;
  dob?: string;
}
