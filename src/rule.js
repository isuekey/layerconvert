
const isExpressRegexp = /\W/;
const isExpression = (str) => {
  return isExpressRegexp.test(str);
};
const reservedMap = {
  return:true,
  new:true,
  true:true,
  false:true
};
const paramRegex = /\W*([a-zA-Z][\w\.]*)\s*(?![\w\[\(]+)/g;
const getParamsArrayInExpressionString = (str) => {
  if(!str) return [];
  let exec = paramRegex.exec(str);
  let id = 0;
  const params=[];
  while(exec) {
    // console.log('get params',str, ++id, exec, 'from', exec[1].split('\.')[0]);
    params.push(exec[1].split('\.')[0]);
    exec = paramRegex.exec(str);
  }
  return params;
};
const getParamsArray = (str) => {
  const hadParam ={};
  const params = getParamsArrayInExpressionString(str).filter(ele => !reservedMap[ele]).filter(ele => {
    return !hadParam[ele] && (hadParam[ele]=ele);
  });
  return params;
};
const returnMap = {return:true};
const functionCache = {};
const expressRule = (str, cache) => {
  if(cache && cache[str]) return cache[str];
  if(functionCache[str]) return functionCache[str];
  const params = getParamsArrayInExpressionString(str);
  const hasReturnKey = !!params.filter(ele => returnMap[ele])[0];
  const pureParams = params.filter(ele => !reservedMap[ele]);
  let func = null;
  if (hasReturnKey) {
    func = new Function(...pureParams, str);
  } else {
    func = new Function(...pureParams, 'return ' + str);
  }
  functionCache[str]=func;
  if(cache){ cache[str] = func; }
  return func;
};

export {
  expressRule,
  isExpression,
  getParamsArray
}
