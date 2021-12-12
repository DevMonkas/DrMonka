var _Environments = {
  production: {BASE_URL: '', API_KEY: ''},
  staging: {BASE_URL: '', API_KEY: ''},
  development: {
    BASE_URL: 'http://localhost:8000', //"https://qivihealth-backend.herokuapp.com",
    // BASE_URL: 'https://0b33-2405-201-8000-d122-b9ed-5834-7a8d-eb8.ngrok.io',
    API_KEY: '',
  },
};

function getEnvironment() {
  return _Environments['development'];
}

var Environment = getEnvironment();
export {Environment};
