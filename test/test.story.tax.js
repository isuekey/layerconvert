const convert = require('../index.js');
const { assert, expect, should } = require('chai');
const { describe, it } = require('mocha');
const { rule, down } = convert;
const storyTax = require('./data/story.tax.js');


describe('story tax calculate rule', () => {
  it('bonus tax rule', ()=>{
    expect(rule.isExpression(storyTax.rule.bonusTax)).to.equal(true);
    const params = rule.getParamsArray(storyTax.rule.bonusTax);
    expect(params).to.have.lengthOf(2);
    expect(params).to.have.deep.equal(["discountAmount","consolidatedTaxRate"]);
    // console.log('express rule', rule.expressRule(storyTax.rule.bonusTax).toString());
  });
});

describe('story tax calculate down', () => {
  const parsed = down.downConvert(storyTax.data, storyTax.rule, {});
  it('bonus tax calculate', ()=>{
    expect(parsed.bonusTax).to.be.a('string');
    expect(parsed.bonusTax).to.equal(storyTax.result.bonusTax);
  });
  it('bonus taxfree calculate', () => {
    expect(parsed.bonusAmountTaxFree).to.be.a('number');
    expect(parsed.bonusAmountTaxFree).to.equal(storyTax.result.bonusAmountTaxFree);
  });
  it('real amount calculate', () => {
    expect(parsed.realAmount).to.be.a('number');
    expect(parsed.realAmount).to.equal(storyTax.result.realAmount);
  });
  it('real tax calculate', () => {
    expect(parsed.realTax).to.be.a('string');
    expect(parsed.realTax).to.equal(storyTax.result.realTax);
  });
  it('real amountTaxFree calculate', () => {
    expect(parsed.realAmountTaxFree).to.be.a('number');
    expect(parsed.realAmountTaxFree).to.equal(storyTax.result.realAmountTaxFree);
  });
});
