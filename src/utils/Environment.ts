var _Environments = {
  production: {BASE_URL: '', API_KEY: ''},
  staging: {BASE_URL: '', API_KEY: ''},
  development: {
    BASE_URL: 'https://qivihealth-backend.herokuapp.com', //"https://topastro-backend.herokuapp.com",
    // BASE_URL: 'https://4337-2405-201-8000-d126-b05e-36c2-e49d-7c45.ngrok.io',
    API_KEY: '',
  },
};

function getEnvironment() {
  return _Environments['development'];
}

var Environment = getEnvironment();
export {Environment};
