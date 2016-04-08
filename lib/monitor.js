'use strict';
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var executor = require('./executor');

var monitor = (function() {
	var api = {},
		executors = [],
		transporter;
	var mongodburl = 'mongodb://localhost/test';
	mongoose.createConnection(mongodburl);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	var monitorSchema = mongoose.Schema({
		nuser: {
			type: String,
			index: true
		},
		url: {
			type: String,
			index: true
		},
		jqpath: {
			type: String,
			index: true
		},
		blockname: String,
		notifiers: {
			emails: [String],
			wechats: [String]
		}
	});
	monitorSchema.statics.findAndModify = function(query, sort, doc, options, callback) {
		return this.collection.findAndModify(query, sort, doc, options, callback);
	};
	var MonitorModel = mongoose.model('Monitor', monitorSchema);

	function createSMTP() {
		if (!transporter) {
			transporter = nodemailer.createTransport({
				host : 'smtp.163.com',
				port : 465,
				secure: true,
				auth : {
					user: 'xhjappadmin@163.com',
					pass: 'devc0re4'
				}
			});
		}
	}
	/*	@notifiers an array of email address
	 *	@url
	 *	@blockname
	 *	@value
	 *  callback: error, info
	 */
	api.sendEmail = function(options, callback) {
		var mailOptions = {
			from: 'xhjappadmin@163.com', // sender address
			to: options.notifiers.join(', '),
			subject: (options.blockname || options.url) + ' 有更新',
			text: '新内容:\n' + options.value, // plaintext body
		};
		createSMTP();
		//send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				return callback(error);
			}
			console.log('Message sent: ' + info.response);
			callback(null, info);
		});
	};
	// Return the monitor
	function checkMonitor(id) {
		if (!global.executors) global.executors = {};
		return global.executors[id];
	}
	/*	
	 * monitor: monitorSchema like
	 *	callback: error
	 */
	api.restartMonitor = function(monitor) {
		api.stopMonitor(monitor);
		api.startMonitor(monitor);
	}

	api.stopMonitor = function(monitor) {
		var id = monitor.url + monitor.jqpath;
		var exe = checkMonitor(id)
		if (exe) {
			exe.clear();
		}
	}

	api.startMonitor = function(monitor) {
		var id = monitor.url + monitor.jqpath;
		var exe = checkMonitor(id)
		if (!exe) {
			var exe = executor.runInSchedule({
				'url': monitor.url,
				'jqpath': monitor.jqpath
			}, function(err, value) {
				//TODO get notifiers
				var notifiers = monitor.notifiers;
				console.log(monitor.url + ' has update!');
				if(notifiers.emails){
					api.sendEmail({url :monitor.url, notifiers: notifiers.emails, value: value, blockname: monitor.blockname }, function(err, info){
						if(err)
							return console.error(err);
						console.log("Email sent to " + notifiers.emails + "\nurl:" + monitor.url);
					});
				}
				if(notifiers.wechats){
					//TODO
				}
			}, function(err, value) {
				//console.log('no change');
			});
			global.executors[id] = exe;
		}
	}

	// function compareNotifiers(a, b) {
	// 	var result = true;
	// 	if (!a.emails) {
	// 		result = !b.emails;
	// 	} else if (a.emails.length) {
	// 		result = b.emails.length && a.emails.length == b.emails.length;
	// 		if (result) {
	// 			result = a.emails.every(function(ele, ind) {
	// 				return ele == b.emails[ind];
	// 			});
	// 		}
	// 	}
	// 	if (!result) return result;

	// 	if (!a.wechats) {
	// 		result = !b.wechats;
	// 	} else if (a.wechats.length) {
	// 		result = b.wechats.length && a.wechats.length == b.wechats.length;
	// 		if (result) {
	// 			result = a.wechats.every(function(ele, ind) {
	// 				return ele == b.wechats[ind];
	// 			});
	// 		}
	// 	}
	// 	return result;
	// }

	/*	
	 * opts: monitorSchema like
	 *	callback: error
	 */
	api.addOrUpdateMonitor = function(opts, callback) {
		MonitorModel.findAndModify({
			url: opts.url,
			jqpath: opts.jqpath,
			nuser: opts.nuser
		}, [], {
			$setOnInsert: {
				notifiers: opts.notifiers,
				blockname: opts.blockname
			}
		}, {
			new: true,
			upsert: true
		}, function(err, model) {
			if (err)
				return callback(err);
			console.log('updated ' + model.value._id);
			api.restartMonitor(model.value);
			callback();
		});
		// MonitorModel.find({
		// 	url: opts.url,
		// 	jqpath: opts.jqpath,
		// 	nuser: opts.user
		// }, function(err, models) {
		// 	if (err)
		// 		return callback(err);
		// 	if (models.length > 0 && compareNotifiers(models[0].notifiers, opts.notifiers)) {
		// 		models[0].notifiers = opts.notifiers;
		// 		models[0].save(function(err, b) {
		// 			if (err)
		// 				return console.error(err);
		// 			callback();
		// 		});
		// 	} else if (models.length == 0) {
		// 		var newModel = new MonitorModel(opts);
		// 		newModel.save(function(err, b) {
		// 			if (err)
		// 				return console.error(err);
		// 			callback();
		// 		});
		// 	}
		// });
	};

	api.findMonitors = function(opts, callback) {

	};

	api.deleteMonitors = function(opts, callback) {

	};


	return api;
})();
module.exports = monitor;