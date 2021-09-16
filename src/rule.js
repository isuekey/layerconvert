
const isExpressRegexp = /[^a-zA-Z0-9_]/;
const isExpression = (str) => {
  return isExpressRegexp.test(str);
};
const literalValue="undefined,null,true,false,eval,NaN,Infinity".split(',');
const reservedValue="break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,new,return,super,switch,this,throw,try,typeof,var,void,while,with,yield".split(',');
const globalValue="Array,ArrayBuffer,Atomics,BigInt,BigInt64Array,BigUint64Array,Boolean,DataView,Date,Errors,Float32Array,Float64Array,Function,JSON,Math,Map,Number,Object,Promise,Proxy,Set,String,Symbol,WeakMap,WeakSet".split(',');
const reservedMap = literalValue.concat(reservedValue, globalValue).reduce((sum,key)=>{
  sum[key]=true;
  return sum;
},{});

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
