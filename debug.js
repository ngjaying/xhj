'use strict';

var executor = require('./lib/executor');
var monitor = require('./lib/monitor');
console.log('start test');
// executor.compare({
// 	url: 'url2',
// 	jqpath: 'jqpath2',
// 	value: 'valu2'
// }, function(err, options) {
// 	console.log('changed: ' + options.changed);
// 	console.log('value: ' + options.value);
// });
// exports.run({
// 	url: 'url2',
// 	jqpath: 'jqpath2',
// 	value: 'va1adslu2'
// }, function(err, value) {
// 	console.log('changed to ' + value);
// }, function(err, value) {
// 	console.log('no change');
// });
// executor.run({
// 	'url': 'http://www.xmws.gov.cn/sydwzk/policy/policy.jsp?TypeID=7',
// 	'jqpath': 'form[name=formRight] table:nth-of-type(5) td a'
// }, function(err, value) {
// 	console.log('changed to ' + value);
// }, function(err, value) {
// 	console.log('no change');
// });
// executor.runInSchedule({
// 	'url': 'http://www.xmws.gov.cn/sydwzk/policy/policy.jsp?TypeID=7',
// 	'jqpath': 'form[name=formRight] table:nth-of-type(5) td a'
// }, function(err, value) {
// 	console.log('changed to ' + value);
// }, function(err, value) {
// 	console.log('no change');
// });

// monitor.sendEmail({
// 	notifiers: ['ngjaying@gmail.com', 'johnnyyellow@gmail.com'],
// 	blockname: 'xiamenweisheng',
// 	value: 'new value'
// }, function(err, info) {
// 	if (err)
// 		return console.log(err);
// 	console.log('end test');
// });
// monitor.addOrUpdateMonitor({
// 	url: 'url2',
// 	jqpath: 'jqpath2',
// 	user: 'hj',
// 	notifiers: {emails: ['nots'], wechats : ['abc']}
// }, function(){
// 	console.log('success');
// });

// monitor.addOrUpdateMonitor({
// 	url: 'url2',
// 	jqpath: 'jqpath2',
// 	user: 'hj',
// 	notifiers: {emails : ['nots2']}
// },function(){
// 	console.log('success');
// });

monitor.addOrUpdateMonitor({
	url: 'url2',
	jqpath: 'jqpath2',
	user: 'hj',
	notifiers: {emails : ['nots2']},
	value: 'value2'
},function(){
	console.log('success');
});