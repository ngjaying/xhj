'use strict';

var expect = require('chai').expect;
var executor = require('../lib/executor');

describe('executor', function(){
  //Set timeout for async funcs
  this.timeout(20000);
  describe('getValues', function(){
    it('test get correct news array from xiamen weisheng', function(done){
      executor.getValues({
        'url': 'http://www.xmws.gov.cn/sydwzk/policy/policy.jsp?TypeID=7',
        'jqpath': 'form[name=formRight] table:nth-of-type(5) td a'
      }, function(err, result) {
        if (err)
          throw err;
        expect(result).have.length(10);
        done();
      });
    });
    it('test xiamen weisheng title', function(done) {
      executor.getValues({
        'url': 'http://www.xmws.gov.cn/sydwzk/policy/policy.jsp?TypeID=7',
        'jqpath': 'form[name=formRight] table:nth-of-type(2) td'
      }, function(err, result) {
        if (err)
          throw err;
        expect(result).have.length(2);
        expect(result[1]).equal('招考动态');
        done();
      });

    });
  });

  describe('getValues', function(){
    it('test new id', function(done) {
      executor.compare({
        url : 'url',
        jqpath : 'jqpath',
        value : 'value'
      }, function(err, result){
        expect(err).to.be.null;
        done();
      });
    });
    it('test new value', function(done) {
      executor.compare({
        url : 'url',
        jqpath : 'jqpath',
        value : 'value2'
      }, function(err, result){
        expect(err).to.be.null;
        expect(result).have.property('changed').with.be.true;
        done();
      });
    });
    it('test new value', function(done) {
      executor.compare({
        url : 'url',
        jqpath : 'jqpath',
        value : 'value2'
      }, function(err, result){
        expect(err).to.be.null;
        expect(result).have.property('changed').with.be.false;
        done();
      });
    });
  });

});