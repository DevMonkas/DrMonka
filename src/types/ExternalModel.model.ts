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
  money?: number;
}
export interface Conversations {
  _id?: string;
  userPhone?: string;
  doctorPhone?: string;
  status?: boolean;
  __v?: number;
  name?: string;
  image?: string;
}
export interface Message {
  _id?: string;
  text?: string;
  createdAt?: Date;
  system?: boolean;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
}
