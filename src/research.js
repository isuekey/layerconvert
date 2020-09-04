let reg, result, str;
const logResult = (regStr, str) => {
  let result = undefined;
  const reg = new RegExp(regStr, 'g');
  do {
    result = reg.exec(str);
    console.log('result', result, reg);
  }while(!!result);
};

const jsNameStartReg="[a-zA-Z_$]";
const jsStatementsDelimiterReg="^;{}?:";
const jsNameReg= [jsNameStartReg, "(?:_|\\w)*"].join('');
const jsObjectFieldReg=[jsNameReg, ":"].join('');
const jsDottedNameReg = [jsNameReg, "(?:\\.", jsNameReg, ")*"].join('');
const jsCppName = jsNameReg;
const jsOptCppStart = "^\\s*#\\s*([[:alnum:]]+)";
const jsPlainMethodReg = [
  "^\\s*?(", jsDottedNameReg, ")\\.prototype",
  "\\.(", jsNameReg, ")\\s*?=\\s*?(function).*$"
].join('');
const jsPlainClassReg = [
  "^\\s*(", jsDottedNameReg, ")\\.prototype",
  "\\s*=\\s*{"].join('');
const jsMpClassDeclareReg = [
  "^\\s*var\\s+",
  "(", jsNameReg, ")",
  "\\s*=\\s*",
  "(", jsDottedNameReg, ")\\.extend(?:Final)?\\s*\\({?.*$"
].join('');
const jsPrototypeOboleteClassDeclareReg = [
  "^\\s*(?:var\\s+)?",
  "(", jsDottedNameReg, ")",
  "\\s*=\\s*Class\\.create\\(\\)"
].join('');
const jsPrototypeObjectExtendClassDeclareReg1=[
  "^\\s*Object\\.extend\\s*\\(\\s*",
  "(", jsDottedNameReg, ")",
  "\\s*\\,\\s*\\{"
].join('');
const jsPrototypeObjectExtendClassDeclareReg2 = [
  "^\\s*(?:var\\s+)?",
  "(", jsDottedNameReg, ")",
  "\\s*=\\s*Object\\.extend\\s*\\("
].join('');
const jsPrototypeClassDeclareReg = [
  "^\\s*(?:var\\s+)?",
  "(", jsNameReg, ")",
  "\\s*=\\s*Class\\.create\\s*\\(\\s*",
  "(?:(", jsDottedNameReg, ")\\s*,\\s*)?{?",
].join('');

const jsFunctionHeadingReg1 = [
  "^\\s*function(?:\\s|\\*)+(", jsNameReg, ")"
].join('');
const jsFunctionHeadingReg2 = [
  "^\\s*(", jsNameReg, ")\\s*:\\s*function.*$"
].join('');
const jsFunctionHeadingReg3 = [
  "^\\s*(?:var\\s+)?(", jsDottedNameReg,")",
  "\\s*=\\s*function.*$"
].join('');
const jsStateDelimiter = ";?\\s*\n|{\\s*\n";
const jsLexicalStringReg = `".*?"|'.*?'`;
const jsVariableDeclareStartReg = [
  "\\s*(?:(?:var|const|let)\\s+)",
].join('');
const jsLocalVariableReg = [
  jsVariableDeclareStartReg,
  "((?:\\s*", jsNameReg, "\\s*,)*",
  "(?:\\s*", jsNameReg, "))\\s*=?\\s*"
].join('');


reg = new RegExp(jsLocalVariableReg);
str = ` const pp = "yyy" + 'ooo' + abc;
const oo = 'zzz' `;
//logResult(jsLocalVariableReg, str);
//console.log("split", str.split(reg));

reg = new RegExp(jsVariableDeclareStartReg);
result = reg.exec(str);
//console.log('result', result, reg, reg.lastIndex);

reg = new RegExp(jsLexicalStringReg, 'g');
//console.log('split', str.split(reg));

// result = reg.exec(str);
//console.log('result', result, reg, reg.lastIndex);

reg = new RegExp(jsStateDelimiter);
result = reg.exec(str);
//console.log('result', result, reg);
//console.log(str.split(reg));

str = ` const pp = "yyy" + abc; 
const oo = 'zzz' `;
result = reg.exec(str);
//console.log('result', result, reg);
//console.log(str.split(reg));

reg = new RegExp(jsFunctionHeadingReg3);
result = reg.exec(' var oo =function');
// console.log('result', result, reg);

reg = new RegExp(jsFunctionHeadingReg2);
result = reg.exec(' oo:function');
//console.log('result', result, reg);

reg = new RegExp(jsFunctionHeadingReg1);
result = reg.exec(' function* something() {} ');
//console.log('result', result, reg);

reg = new RegExp(jsPrototypeClassDeclareReg);
result = reg.exec(' var OO = Class.create( a.b, {}) ');
//console.log('result', result, reg);

reg = new RegExp(jsPrototypeObjectExtendClassDeclareReg2);
result = reg.exec(' var oo = Object.extend( a.b, {}) ');
//console.log('result', result, reg);

reg = new RegExp(jsPrototypeObjectExtendClassDeclareReg1);
result = reg.exec(' Object.extend( a.b, {}) ');
//console.log('result', result, reg);

reg = new RegExp(jsPrototypeOboleteClassDeclareReg);
result = reg.exec(' var newClass = Class.create() ');
//console.log('result', result, reg);

reg = new RegExp(jsMpClassDeclareReg);
result = reg.exec(' var newClass = BaseClass.extend( ');
//console.log('result', result, reg);

reg = new RegExp(jsPlainClassReg);
result = reg.exec(' Class.prototype = {} ');
// console.log('result', result, reg);

reg = new RegExp(jsPlainMethodReg);
result = reg.exec(' Class.prototype.oo = function ');
// console.log('result', result, reg);

reg = new RegExp(jsDottedNameReg);
result = reg.exec(' NewClass.oo ');
// console.log('result', result, reg);

reg = new RegExp(jsNameReg);
// result = reg.exec(' NewClass = Class.create() ');
// console.log('result', result, reg);
logResult(reg, str);

