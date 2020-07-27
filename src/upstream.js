
import * as rule from './rule';

const targetSymbol = Symbol.for('target');
const typeSymbol = Symbol.for('type');

const upstreamConvert = (local={}, dataRule={}, target={}) => {
  const targetRule = dataRule[targetSymbol];
  const typeRule = dataRule[targetRule];
  let targetScope = local;
  if(targetRule) {
    targetScope = local[targetRule];
  }
  switch(typeRule) {
  case 'object':
  default:
    return upstreamConvertBase(targetScope, dataRule, target);
  }
  
};

const upstreamConvertBase = (local={}, dataRule={}, target={})=>{
  return Object.keys(dataRule).reduce((sum, curRule) => {
    const targetKey = dataRule[curRule];
    const isExpression = rule.isExpression(curRule);
    let localValue = local[curRule];
    if(isExpression) {
      const params = rule.getParamsArray(curRule).map(ele => {
        return local[ele];
      });
      const curExpress = rule.expressRule(curRule);
      localValue = curExpress(...params);
    }
    if(targetKey[targetSymbol]) {
      sum[targetKey[targetSymbol]] = upstreamConvert(localValue, {
        ...targetKey,
        [targetSymbol]:undefined
      }, {});
      return sum;
    }
    sum[targetKey]=localValue;
    return sum;
  }, {...target});
};

export {
  upstreamConvert,
  upstreamConvertBase,
}
