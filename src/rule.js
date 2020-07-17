
const isExpressRegexp = /[^_a-zA-Z0-9]/;
const isExpression = (str) => {
  return isExpressRegexp.test(str);
};

const getParamsArrayInExpressionString = (str) => {
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
