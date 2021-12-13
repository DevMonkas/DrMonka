var _Environments = {
  production: {BASE_URL: '', API_KEY: ''},
  staging: {BASE_URL: '', API_KEY: ''},
  development: {
    BASE_URL: 'https://qivihealth-backend.herokuapp.com', //"https://topastro-backend.herokuapp.com",
    // BASE_URL: 'https://aa90-2405-201-8000-d122-9dd3-c28a-85df-2ab1.ngrok.io',
    API_KEY: '',
    VOX_APP_NAME: 'drmonka',
    VOX_ACC_NAME: 'drmonka',
  },
};

function getEnvironment() {
  return _Environments['development'];
}

var Environment = getEnvironment();
export {Environment};
