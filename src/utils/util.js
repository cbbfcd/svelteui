import { isString, isNumber, get } from 'lodash-es';

import { hasOwn } from './share';
import { debug, throwError } from './error';

const SCOPE = 'svelteui:Util';

export function addUnit(value) {
  if (isString(value)) {
    return value;
  } else if (isNumber(value)) {
    return `${value}px`;
  }
  debug(SCOPE, 'binding value must be a string or number');
  return '';
}

export function getPropByPath(obj, path, strict) {
  let tempObj = obj;
  let key, value;

  if (obj && hasOwn(obj, path)) {
    key = path;
    value = get(tempObj, path);
  } else {
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/^\./, '');

    const keyArr = path.split('.');
    let i = 0;
    for (i; i < keyArr.length - 1; i++) {
      if (!tempObj && !strict) break;
      const key = keyArr[i];

      if (key in tempObj) {
        tempObj = tempObj[key];
      } else {
        if (strict) {
          throwError(SCOPE, 'Please transfer a valid prop path to form item!');
        }
        break;
      }
    }
    key = keyArr[i];
    value = get(tempObj, keyArr[i]);
  }
  return {
    o: tempObj,
    k: key,
    v: value
  };
}

export const wrapObj2StylStr = (object) => {
  if (!object) return undefined;
  return Object.entries(object)
    .map(([k, v]) => (k && v ? `${k}: ${v}` : null))
    .filter(Boolean)
    .join(';');
};
