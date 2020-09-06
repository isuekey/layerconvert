const convert = require('../index.js');
const { assert, expect, should } = require('chai');
const database = require('./test.data.js');
const {down:downData} = database;

const {rule,down} = convert;
describe('convert down parse', ()=>{
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
  describe('simple convert parse', () => {
    const parsed = down.downConvertBase(downData.upstream, downData.downRule, {});
    it(`it hould have 'id','serial','bill', 'orders', 'finish', 'billQuantity'`, ()=> {
      // console.log('simple convert',parsed);
      expect(parsed).to.have.own.all.keys('id','serial','bill', 'orders', 'finish', 'billQuantity');
    });
    it('parsed.billQuantity is equal upstream.order.quantity:1', () => {
      expect(parsed.billQuantity).to.equal(downData.upstream.order.quantity);
      expect(parsed.billQuantity).to.equal(downData.expected.billQuantity);
    });
    it('parsed.bill.amount is equal upstream.order.price * upstream.order.quantity', ()=>{
      const order = downData.upstream.order;
      expect(parsed.bill.amount).to.equal(order.price * order.quantity);
    });
  });
  describe('simple convert parse from {append:"append"}', () => {
    const parsed = down.downConvertBase(downData.upstream, downData.downRule, downData.base);
    it(`it should have 'id','serial','bill', 'orders', 'finish', 'append', 'billQuantity' `, ()=> {
      // console.log('simple convert',parsed);
      expect(parsed).to.have.own.all.keys('id','serial','bill', 'orders', 'finish', 'append', 'billQuantity');
    });
    it('its finish is append', () => {
      expect(parsed.finish).to.equal('-123');
    });
  });
  describe('merge convert parse from {append:"append"}', () => {
    const parsed = down.downConvertMerge(downData.upstream, downData.downRule, downData.base);
    it(`it should have 'aNumber','bString','order','orderList', 'id','serial','bill', 'orders', 'finish', 'append', 'billQuantity' `, ()=> {
      // console.log('simple convert',parsed);
      expect(parsed).to.have.own.all.keys('aNumber','bString','order','orderList', 'id','serial','bill', 'orders', 'finish', 'append', 'billQuantity');
    });
    it('its finish is append', () => {
      expect(parsed.finish).to.equal(downData.expected.finish);
    });
    it(`its orders item is merged any 'price', 'goods', 'quantity', 'amount' `, () => {
      expect(parsed.orders[0]).to.have.own.all.keys('price', 'goods', 'quantity', 'amount');
    });
    it(`its orders item is merged any 'price', 'goods', 'quantity', 'amount', 'unit' `, () => {
      expect(parsed.orders[2]).to.have.own.all.keys('price', 'goods', 'quantity', 'amount','unit');
    });
  });
});

