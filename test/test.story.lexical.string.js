const convert = require('../index.js');
const { assert, expect, should } = require('chai');
const { describe, it } = require('mocha');
const { rule, down } = convert;
const storyLexicalString = require('./data/story.lexical.string.js');

describe('story lexical string in rule', ()=>{
  it('lexical string rule', ()=>{
    expect(rule.isExpression(storyLexicalString.rule.currentType)).to.equal(true);
    const params = rule.getParamsArray(storyLexicalString.rule.currentType);
    expect(params).to.have.lengthOf(2);
    expect(params).to.have.deep.equal(storyLexicalString.params.currentType);
  });
});

describe('story lexical string down', ()=>{
  const parsed = down.downConvert(storyLexicalString.data, storyLexicalString.rule, {});
  it('lexical string currentType', ()=>{
    expect(parsed.currentType).to.be.a('string');
    expect(parsed.currentType).to.equal(storyLexicalString.result.currentType);
  });
  it('lexical string oppositeType', ()=>{
    expect(parsed.oppositeType).to.be.a('string');
    expect(parsed.oppositeType).to.equal(storyLexicalString.result.oppositeType);
  });
  it('lexical string otherType', ()=>{
    expect(parsed.otherType).to.be.a('string');
    expect(parsed.otherType).to.equal(storyLexicalString.result.otherType);
  });
});

