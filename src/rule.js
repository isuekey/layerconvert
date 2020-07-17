
const isExpressRegexp = /\W/;
const isExpression = (str) => {
  return isExpressRegexp.test(str);
};

const paramRegex = /\W*([a-zA-Z][\w\.]*)\s*(?![\w\[\(]+)/g;
const getParamsArrayInExpressionString = (str) => {
  if(!str) return [];
  let exec = paramRegex.exec(str);
  let id = 0;
  const params=[];
  while(exec) {
    // console.log('get params', ++id, exec, 'from', str);
    params.push(exec[1]);
    exec = paramRegex.exec(str);
  }
  return params;
};
const getParamsArray = getParamsArrayInExpressionString;

const expressRule = (str) => {
  
};

export {
  expressRule,
  isExpression,
  getParamsArray
}
