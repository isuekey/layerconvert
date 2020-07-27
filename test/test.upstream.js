const convert = require('../index.js');
const { assert, expect, should } = require('chai');
const database = require('./test.data.js');

describe('convert upstream parse empty', () => {
  const {upstreamRule:rule, local:local, expected} = database.upstream;
  const upstream = convert.upstream.upstreamConvert(local, rule, {});
  it('upstream will deep equal expected', () => {
    expect(upstream).to.deep.equal(expected);
  });
});
describe('convert upstream parse base', () => {
  const {upstreamRule:rule, local:local, base, expected} = database.upstream;
  const upstream = convert.upstream.upstreamConvert(local, rule, base);
  const target = {
    ...expected,
    ...base
  };
  it('upstream will deep equal expected+base', () => {
    expect(upstream).to.deep.equal(target);
  });
});
