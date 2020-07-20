const convert = require('../index.js');
const { assert, expect, should } = require('chai');
const database = require('./test.data.js');
const {down:downData} = database;

describe('convert down pass', ()=>{
  const {rule,down} = convert;
  describe('down rule parse function', () => {
    it('down rule parse expression', () => {
      const ruleParsed = rule.expressRule(downData.downRule.bill.tax);
      const params = rule.getParamsArray(downData.downRule.bill.tax).map(ele => {
        return downData.upstream.order[ele];
      });
      expect(ruleParsed(...params)).to.equal(downData.expected.bill.tax);
    });
    it('downConvertBase equal downConvert(upstream, rules, target, false)', () => {
      
    });
  });
  describe('simple base parse', () => {
    it('simple converted', ()=> {
      const parsed = down.downConvertBase(downData.upstream, downData.downRule, {});
      // console.log('simple convert',parsed);
      expect(parsed).to.have.own.all.keys('id','serial','bill', 'orders', 'finish');
    });
  });
});
