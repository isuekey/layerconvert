
const isExpressRegexp = /\W/;
const isExpression = (str) => {
  return isExpressRegexp.test(str);
};

const paramRegex = /\W*([a-zA-Z]\w*)\s*(?![\[\(])/g;
const getParamsArrayInExpressionString = (str) => {
  if(!str) return [];
  let exec = paramRegex.exec(str);
  let id = 0;
  while(exec) {
    console.log('get params', ++id, exec, 'from', str);
    exec = paramRegex.exec(str);
  }
  if(!exec) return [];
  return [];
};
const getParamsArray = getParamsArrayInExpressionString;

const expressRuleToString = (str) => {
  return isExpression.test(str);
};

export {
  expressRuleToString,
  isExpression,
  getParamsArray
}
