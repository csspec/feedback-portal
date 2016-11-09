const ip = require('ip').address();

/**
 * server configuration options, edit here!
 */
const options = {
    FEEDBACK_CLIENT_ID: '',
    FEEDBACK_CLIENT_SECRET: '',
    FEEDBACK_URL: 'http://' + ip + ':8081',
    ACADEMIC_URL: 'http://' + ip + ':5000',
    IDENTITY_URL: 'http://' + ip + ':8080',
    AUTH_URL: 'http://' + ip + ':8090',
    REDIRECT_URL: 'http://' + ip + ":3000/redirect",
    CSSPEC_SECRET: "",
    SERVER_URL: ip
};

/**
 * set required options as environment variables
 */
for (let option in options) {
  console.log(`${option} = '${options[option]}'`);
  process.env[option] = options[option];
}
