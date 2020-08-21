
const convert = require('../index.js');
const { assert, expect, should } = require('chai');
const database = require('./test.data.js');
const {down} = database;

const rule = convert.rule;
describe('common convert rule', () => {
  describe('check string is express', () => {
    it('6a is not expression', () => {
      expect(rule.isExpression('6a')).to.be.false;
    });
    it('empty string is not expression', () => {
      expect(rule.isExpression('')).to.be.false;
    });
    it('undefined is not expression', () => {
      expect(rule.isExpression(undefined)).to.be.false;
    });
    it('null is not expression', () => {
      expect(rule.isExpression(null)).to.be.false;
    });
    it('NaN is not expression', () => {
      expect(rule.isExpression(NaN)).to.be.false;
    });
    it('6*a is expression', () => {
      expect(rule.isExpression('6*a')).to.be.true;
    });
    it('-a is expression', () => {
      expect(rule.isExpression('-a')).to.be.true;
    });
    it('-6 is expression', () => {
      expect(rule.isExpression('-6')).to.be.true;
    });
    it('Number(0) is expression', () => {
      expect(rule.isExpression('Number(0)')).to.be.true;
    });
    it('Number(a) is expression', () => {
      expect(rule.isExpression('Number(a)')).to.be.true;
    });
    it('base.order is expression', () => {
      expect(rule.isExpression('base.order')).to.be.true;
    });
  });
  describe('get param from express', () => {
    it('6 has no param', () => {
      expect(rule.getParamsArray('6')).to.be.an('array').that.is.empty;
    });
    it('-6 has no param', () => {
      expect(rule.getParamsArray('-6')).to.be.an('array').that.is.empty;
    });
    it('-6 * a has param [a]', () => {
      const param = rule.getParamsArray('-6*a');
      expect(param).to.be.an('array').that.not.is.empty;
      expect(param).to.have.lengthOf(1);
      expect(param[0]).to.equal('a');
    });
    it('-price * amount has param [price amount]', () => {
      const param = rule.getParamsArray('-price * amount');
      expect(param).to.be.an('array').that.not.is.empty;
      expect(param).to.have.lengthOf(2);
      expect(param[0]).to.equal('price');
      expect(param[1]).to.equal('amount');
    });
    it('Number(0) has no param', () => {
      const param = rule.getParamsArray('Number(0)');
      expect(param).to.be.an('array').that.is.empty;
    });
    it('Number(amount) has param[amount]', () => {
      const param = rule.getParamsArray('Number(amount)');
      expect(param).to.be.an('array').that.not.is.empty;
      expect(param).to.have.lengthOf(1);
      expect(param[0]).to.equal('amount');
    });
    it('price * amount(0) has param [price]', () => {
      const param = rule.getParamsArray('price * amount(0)');
      expect(param).to.be.an('array').that.not.is.empty;
      expect(param).to.have.lengthOf(1);
      expect(param[0]).to.equal('price');
    });
    it('base.order has param [base]', () => {
      const param = rule.getParamsArray('base.order');
      expect(param).to.be.an('array').that.not.is.empty;
      expect(param).to.have.lengthOf(1);
      expect(param[0]).to.equal('base');
    });
    it('base.order * 1 has param [base]', () => {
      const param = rule.getParamsArray('base.order * 1');
      expect(param).to.be.an('array').that.not.is.empty;
      expect(param).to.have.lengthOf(1);
      expect(param[0]).to.equal('base');
    });
    it('return base.order * 1 has param [base]', () => {
      const param = rule.getParamsArray('return base.order * 1');
      expect(param).to.be.an('array').that.not.is.empty;
      expect(param).to.have.lengthOf(1);
      expect(param[0]).to.equal('base');
    });
    it('base.count * base.amount has param [base]', () => {
      const param = rule.getParamsArray('base.count * base.amount');
      expect(param).to.be.an('array').that.not.is.empty;
      expect(param).to.have.lengthOf(1);
      expect(param[0]).to.equal('base');
    });
  });
  describe('rule parse function', () => {
    it('rule parse expression', () => {
      const ruleParsed = rule.expressRule(down.downRule.bill.tax);
      const params = rule.getParamsArray(down.downRule.bill.tax).map(ele => {
        return down.upstream.order[ele];
      });
      expect(ruleParsed(...params)).to.equal(down.expected.bill.tax);
    });
  });
});

