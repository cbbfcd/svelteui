import { isString, isNumber } from 'lodash-es';
import { debug } from './error';

const SCOPE = 'Util';

export function addUnit(value) {
  if (isString(value)) {
    return value;
  } else if (isNumber(value)) {
    return `${value}px`;
  }
  debug(SCOPE, 'binding value must be a string or number');
  return '';
}
