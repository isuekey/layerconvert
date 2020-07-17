
const convert = require('../index.js');
const { assert, expect, should } = require('chai');

const upstream = {
  // data:'value',
  aNumber:1,
  bString:"123",
  order:{
    price:1230.55,
    goods:'手机',
    quantity:1,
    tax:0,
  },
  orderList:[
    { price:123, goods:'皮萨', quantity:1 },
    { price:13, goods:'毛巾', quantity:2 },
    { price:4.99, goods:'苹果', quantity:1.5, unit:'斤' },
  ]
};

const downRule = {
  // "targetKey":"upstreamRule",
  id:'aNumber',
  serial:'bString',
  bill: {
    [Symbol.for('scope')]:"order",
    priceBase:'price',
    goodsName:'goods',
    quantity:'quantity',
    amount:'price * quantity',
    tax:'price * quantity * (taxRate || 0.05)'
  },
  orders: {
    [Symbol.for('scope')]:"orderList",
    [Symbol.for('type')]:"array",
    amount:'price * quantity',
  },
  finish:'[append, serial].join("-")'
};

const base = {
  append:'append'
};

const expected = {
  id:1,
  serial:'123',
  order:{
    price:1230.55,
    goods:'手机',
    quantity:1,
    tax:0,
  },
  orderList:[
    { price:123, goods:'皮萨', quantity:1 },
    { price:13, goods:'毛巾', quantity:2 },
    { price:4.99, goods:'苹果', quantity:1.5, unit:'斤' },
  ],
  bill: {
    price:1230.55,
    goods:'手机',
    quantity:1,
    priceBase:1230.55,
    goodsName:'goods',
    amount:1230.55,
    tax:61.5275
  },
  orders:[
    { price:123, goods:'皮萨', quantity:1, amount:123 },
    { price:13, goods:'毛巾', quantity:2, amount:26 },
    { price:4.99, goods:'苹果', quantity:1.5, unit:'斤', amount:7.485 },
  ],
  append:'append',
  finish:'append-123'
};
describe('convert rule', () => {
  const rule = convert.rule;
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
    });
    it('-price * amount has param [price amount]', () => {
      const param = rule.getParamsArray('-price * amount');
      expect(param).to.be.an('array').that.not.is.empty;
    });
  });
});

describe('convert down pass', ()=>{
  it('rule parse expression', () => {
    // const ruleParsed = convert.rule.expressRuleToString(downRule.bill.tax);
    const expectedRule = 'this.price * this.quantity * (this.taxRate || 0.05)';
    // expect(ruleParsed).to.equal(expectedRule);
  });
  it('the convert.down', () => {
    // const parsed = convert.down(upstream, downRule, {});
  });
});
