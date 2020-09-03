
exports.rule = {
  currentType:"partyKind || 'MAIN'",
  oppositeType:'oppositeKind || "REBATE"',
  otherType:'otherKind || "REBATE"',
};

exports.data = {
  partyKind:'REBATE',
  oppositeKind:'MAIN',
};

exports.result = {
  currentType:'REBATE',
  oppositeType:'MAIN',
  otherType:'REBATE',
};
exports.params = {
  currentType:["partyKind"],
  oppositeType:['oppositeKind'],
  otherType:['otherKind']
};

