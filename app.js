'use strict';

var monitor = require('./lib/monitor');

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
monitor.addOrUpdateMonitor({
	url: 'http://www.xmws.gov.cn/sydwzk/policy/policy.jsp?TypeID=7',
	jqpath: 'form[name=formRight] table:nth-of-type(5) td a',
	nuser: 'hjy',
	notifiers: {emails : ['johnnyyellow@gmail.com']},
},function(){
	console.log('success to start');
});
monitor.addOrUpdateMonitor({
	url: 'http://www.xmrs.gov.cn/syggc/syzp/zkdt/',
	jqpath: '#news a',
	nuser: 'hjy',
	notifiers: {emails : ['johnnyyellow@gmail.com']},
},function(){
	console.log('success to start');
});
monitor.addOrUpdateMonitor({
	url: 'http://www.jimei.gov.cn/xxgk/F394/rsxx/zkzp/',
	jqpath: 'table.h30.mar_t10 a',
	user: 'hjy',
	notifiers: {emails : ['johnnyyellow@gmail.com']},
},function(){
	console.log('success to start');
});
monitor.addOrUpdateMonitor({
	url: 'http://www.haicang.gov.cn/xx/zdxxgk/jbxxgk/rsxx/zkzp/',
	jqpath: 'div.hc15_xx_list li a',
	user: 'hjy',
	notifiers: {emails : ['johnnyyellow@gmail.com']},
},function(){
	console.log('success to start');
});