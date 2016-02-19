'use strict';
var nodemailer = require('nodemailer');

var monitor = (function() {
	var api = {}, transporter;

	function createSMTP() {
		if (!transporter) {
			transporter = nodemailer.createTransport('smtps://sourtin.io%40gmail.com:nitrousio@smtp.gmail.com');
		}
	}
	/*	@notifiers an array of email address
	 *	@url
	 *	@blockname
	 *	@value
	 */
	api.sendEmail = function(options, callback) {
		var mailOptions = {
			from: 'sourtin.io', // sender address
			to: options.notifiers.join(),
			subject: 'Update for ' + (options.name | options.url),
			text: 'New value:\n' + options.value, // plaintext body
		};
		createSMTP();
		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				return callback(error);
			}
			console.log('Message sent: ' + info.response);
			callback(null, info);			
		});
	}
	return api;
})();
module.exports = monitor;