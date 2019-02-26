module.exports = {
	error: function(message, errCode) {
		return {
			err: errCode || 1,
			message: message
		}
	}
}