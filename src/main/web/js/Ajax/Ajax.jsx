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
	$.ajax({
		url: options.url,
		method: typeof options.method !== 'undefined' ? options.method : 'GET',
		error: typeof options.error !== 'undefined' ? options.error : e => { throw new ConnectionError(e); },
		data: typeof options.data !== 'undefined' ? options.data : '',
		success: typeof options.success !== 'undefined' ? options.success : () => {},
		// that's all for now
	})
}

export { makeAjaxRequest };
