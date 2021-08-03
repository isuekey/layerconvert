
const isExpressRegexp = /[^a-zA-Z0-9_]/;
const isExpression = (str) => {
  return isExpressRegexp.test(str);
};
const lexicalMap = {
  undefined:true,
  null:true,
  true:true,
  false:true,
};
const reservedMap = {
  return:true,
  new:true,
  switch:true,
  case:true,
  const:true,
  let:true,
  function:true,
  var:true,
  ...lexicalMap,
};
const jsNameStart="[a-zA-Z_$]";
const jsName= [jsNameStart, "(?:_|\\w)*"].join('');
const jsStateDelimiter = ";?\\s*\n|{\\s*\n";
const jsLexicalString = `".*?"|'.*?'`;
const jsVariableDeclareStart = [
  "\\s*(?:(?:var|const|let)\\s+)",
].join('');
const jsLocalVariable = [
  jsVariableDeclareStart,
  "((?:\\s*", jsName, "\\s*,)*",
  "(?:\\s*", jsName, "))\\s*=?\\s*"
].join('');
const jsDottedVariable = [
  "(",jsName,")(?!\\s*[\\w\\[\\(]+)",
  "(?:\\.", jsName, ")*"
].join('');;

const pickIdentifier = (pickReg, code, keyCache={}, pickIndex=1) => {
  let result = pickReg.exec(code);
  if(!result) return [];
  if(!pickReg.global) {
    keyCache[result[pickIndex]] = true;
    return [result[pickIndex]];
  }
  const picked = [];
  while(result) {
    keyCache[result[pickIndex]] = true;
    picked.push(result[pickIndex]);
    result = pickReg.exec(code);
  }
  return picked;
};

const stateDelimiterReg = new RegExp(jsStateDelimiter);
const lexicalStringReg = new RegExp(jsLexicalString);
const localVariableReg = new RegExp(jsLocalVariable, 'g');
const dottedVariableReg = new RegExp(jsDottedVariable, 'g');
const getParamsArrayInExpressionString = (str) => {
  if(!str) return [];
  const localVariableMap = {};
  const paramMap = {};
  const params = str.split(stateDelimiterReg).map((statement)=>{
    const codeArray = statement.split(lexicalStringReg).map(code => {
      pickIdentifier(localVariableReg, code, localVariableMap);
      const variableList = pickIdentifier(dottedVariableReg, code, paramMap).filter(ele => !reservedMap[ele]);
      return variableList;
    });
    return codeArray.reduce((sum, cur) => {
      sum.push(...cur);
      return sum;
    }, []);
  }).reduce((sum, cur) => {
    sum.push(...cur);
    return sum;
  }, []).filter(ele => !localVariableMap[ele]);
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
const functionCache = new WeakMap();
const expressRule = (str, cache) => {
  if(cache && cache[str]) return cache[str];
  if(functionCache[str]) return functionCache[str];
  const params = getParamsArray(str);
  const hasReturnKey = !!params.filter(ele => returnMap[ele])[0];
  const pureParams = params.filter(ele => !reservedMap[ele]);
  let func = null;
  if (hasReturnKey) {
    func = new Function(...pureParams, str);
  } else {
    const codeArray = str.split( stateDelimiterReg );
    const last = 'return ' + codeArray.pop();
    const funcBody = [...codeArray, last].join('');
    func = new Function(...pureParams, funcBody);
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
