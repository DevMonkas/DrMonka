export let GlobaluserObj = {
  _id: '',
  phone: '',
  name: '',
  dob: '',
  gender: '',
  money: -1,
  selectedPhone: 0,
};
export let assignValue = (obj: any) => {
  GlobaluserObj = Object.assign({}, obj);
};
