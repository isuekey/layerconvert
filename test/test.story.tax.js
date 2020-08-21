const convert = require('../index.js');
const { assert, expect, should } = require('chai');
const { describe, it } = require('mocha');
const { rule, down } = convert;
const storyTax = require('./data/story.tax.js');


describe('story tax calculate rule', () => {
  it('bonus tax rule', ()=>{
    console.log('tax rule', JSON.stringify(storyTax.rule));
    console.log('rule is', storyTax.rule.bonusTax);
    expect(rule.isExpression(storyTax.rule.bonusTax)).to.equal(true);
    const params = rule.getParamsArray(storyTax.rule.bonusTax);
    expect(params).to.have.lengthOf(2);
    expect(params).to.have.deep.equal(["discountAmount","consolidatedTaxRate"]);
    // console.log('express rule', rule.expressRule(storyTax.rule.bonusTax).toString());
  });
});

describe('story tax calculate down', () => {
  it('bonus tax calculate', ()=>{
    const parsed = down.downConvert(storyTax.data, storyTax.rule, {});
    expect(parsed.bonusTax).to.be.a('number');
    expect(parsed.bonusTax).to.equal(storyTax.result.bonusTax);
  });
});
