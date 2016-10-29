const basePath = 'http://172.31.73.0';

const config = {
	authApi: {
		redirectLink: 'http://172.31.73.181:8080/redirected',
		authorizeLink: 'http://172.31.73.181:8090/oauth/authorize'
	},

	feedbackApi: {
		submitLink: basePath + ':8090/feedback/response/submit',
		resultsApi: basePath + ':8090/feedback/results',
		templateLink: basePath + ':8090/feedback/template/1',
		statusLink: basePath + ':8090/feedback/status',
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
		userId: 2
	}
}

module.exports = config;

