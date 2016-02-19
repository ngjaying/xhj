'use strict';

var executor = require('./lib/executor');

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
console.log('start to run');
executor.runInSchedule({
	'url': 'http://www.xmws.gov.cn/sydwzk/policy/policy.jsp?TypeID=7',
	'jqpath': 'form[name=formRight] table:nth-of-type(5) td a'
}, function(err, value) {
	console.log('changed to ' + value);
}, function(err, value) {
	console.log('no change');
});