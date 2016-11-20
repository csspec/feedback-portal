class ServerError {
	constructor(status, reason, how, link) {
		this.status = status;
		this.reason = reason;
		this.how = how;
		this.link = link;
	}
}

module.exports = ServerError;

