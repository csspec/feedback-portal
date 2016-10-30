import { readCookie } from './Utils/Cookie';
const basePath = 'http://139.59.18.123';
const baseAuth = 'http://139.59.36.12:8090'
const basefeedApi = 'http://139.59.18.123:8090';
const profileLink = '#';

const config = {
	authApi: {
		redirectLink: 'http://192.168.8.100:8080/redirected',
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

	academicApi: {
		coursesOptedLink: basePath + ':8080/academic/courses/students'
	},

	cookie: {
		session: 'CSS_FEEDBACK_SESSION_USER_ID'
	},

	dummy: {
		userId: readCookie('CSS_FEEDBACK_SESSION_USER_ID')
	},

	profileLink: profileLink,
	logoutLink: ''
}

module.exports = config;

