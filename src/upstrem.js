
import * as rule from './rule';

const scopeSymbol = Symbol.for('scope');
const typeSymbol = Symbol.for('type');

const upstreamConvert = (local={}, rule={}, target={}, merged=false) => {
  if(merged) {
    return upstreamConvertMerged(local, rule, target);
  }
  return upstreamConvertBase(local, rule, target);
};

const upstreamConvertMerged = (local={}, rule={}, target={}) =>{
};

const upstreamConvertBase = (local={}, rule={}, target={})=>{
};

export {
  upstreamConvert,
  upstreamConvertBase,
  upstreamConvertMerged,
}
