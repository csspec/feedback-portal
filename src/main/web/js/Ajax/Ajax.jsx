import $ from 'jquery';

class ConnectionError extends Error {
	constructor(message) {
		super(message);
		this.message = typeof message !== 'undefined' ? message : '<no message>';
	}

	getMessage() {
		return this.message;
	}
}

function makeAjaxRequest(options) {
	$.ajax(options);
}

export { makeAjaxRequest };
