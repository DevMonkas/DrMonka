export interface Astrologer {
  id: string;
  name: string;
  email: string;
  phone: string;
  fields: string[];
  languages_known: string[];
  experience: number;
  rate: number;
  address: string;
  image: string;
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
