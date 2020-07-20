import * as rule from './rule';

const scopeSymbol = Symbol.for('scope');
const typeSymbol = Symbol.for('type');
const downConvert = (upstream={}, rule={}, target={}, merged=true) => {
  if(merged) {
    return downConvertMerge(upstream, rule, target);
  }
  return downConvertBase(upstream, rule, target);
};

const downConvertMerge = (upstream={}, rule={}, target={}) => {
};

const downConvertBase = (upstream={}, rules={}, target={}) => {
  // console.log('rules[typeSymbol]', rules[typeSymbol]);
  switch(rules[typeSymbol]) {
  case 'array':
    return downConvertArrayBase(upstream, rules, target);
  default:
    return downConvertNormalBase(upstream, rules, target);
  }
};
const downConvertArrayBase = (upstream=[], rules={}, target=[]) => {
  const newRules = {
    ...rules,
    [typeSymbol]:undefined, [scopeSymbol]:undefined
  };
  // console.log('new rule', newRules, rules);
  return Array.from(target).concat(upstream.map(ele => {
    return downConvertBase(ele, newRules, {});
  }));
};
const downConvertNormalBase = (upstream={}, rules={}, target={}) => {
  const normalParsed = Object.keys(rules).reduce((sum, curKey) => {
    const curRule = rules[curKey];
    if(curRule[scopeSymbol]) {
      sum[curKey] = downConvertBase(upstream[curRule[scopeSymbol]], curRule, {});
      return sum;
    }
    if(!rule.isExpression(curRule)) {
      sum[curKey] = upstream[curRule];
      return sum;
    }
    const curExpress = rule.expressRule(curRule);
    const params = rule.getParamsArray(curRule).map(ele => {
      return upstream[ele];
    });
    sum[curKey] = curExpress(...params);
    return sum;
  }, target);
  // console.log('normalParsed', normalParsed);
  return normalParsed;
};

export {
  downConvert,
  downConvertMerge,
  downConvertBase
}
