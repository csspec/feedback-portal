import { readCookie } from './Utils/Cookie';
const basePath = 'http://139.59.18.123';
const baseAuth = 'http://139.59.36.12:8090';
const basefeedApi = 'http://139.59.18.123:8090';
const baseAcademicApi = 'http://139.59.32.247:5000/academic';
const profileLink = '#';
console.log(process.env.REDIRECT_URL);
const config = {
	authApi: {
		redirectLink: process.env.REDIRECT_URL ? process.env.REDIRECT_URL : 'http://localhost:3000/redirect',
		authorizeLink: baseAuth + '/oauth/authorize'
	},

	feedbackApi: {
		submitLink: basefeedApi + '/feedback/response/submit',
		resultsApi: basefeedApi + '/feedback/results',
		templateLink: basefeedApi + '/feedback/template/1',
		statusLink: basefeedApi + '/feedback/status',
	},

	identityApi: {
		userLink: basePath + ':8080/identity/users',
		studentLink: basePath + ':8080/identity/users/students',
		teachers: basePath + ':8080/identity/users/faculty'
	},

	academicApi: baseAcademicApi + '/courses',

	dummy: {
		userId: window.__CSSPEC__.userId
	},

	profileLink: profileLink,
	logoutLink: ''
};

module.exports = config;

