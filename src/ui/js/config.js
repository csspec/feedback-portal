var basePath = process.env.IDENTITY_URL;
var baseAuth = process.env.AUTH_URL;
var basefeedApi = process.env.FEEDBACK_URL;
var baseAcademicApi = process.env.ACADEMIC_URL;
var profileLink = '#';

var config = {
	authApi: {
		redirectLink: process.env.REDIRECT_URL,
		authorizeLink: baseAuth + '/oauth/authorize',
		checkToken: baseAuth + '/oauth/check_token',
		logout: baseAuth + '/services/logout'
	},

	feedbackApi: {
		submitLink: basefeedApi + '/feedback/response/submit',
		resultsApi: basefeedApi + '/feedback/results',
		templateLink: basefeedApi + '/feedback/template/1',
		statusLink: basefeedApi + '/feedback/status',
	},

	identityApi: {
		userLink: basePath + '/identity/users',
		studentsLink: basePath + '/identity/users/students',
		studentLink: basePath + '/identity/users/student',
		teachers: basePath + '/identity/users/faculty'
	},

	academicApi: baseAcademicApi + '/courses',

	dummy: {
		userId: typeof window !== 'undefined' ? window.__CSSPEC__.userId : ''
	},

	profileLink: profileLink,
	logoutLink: '/logout'
};

console.log(config);
module.exports = config;

