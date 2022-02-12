import {
  MIN_LINE_NAME_LENGTH,
  MAX_LINE_NAME_LENGTH,
} from '../constants/constant.js';
import { MIN_LINE_NAME_MSG, MAX_LINE_NAME_MSG } from '../constants/message.js';

export const checkNameRegulations = stationName => {
  if (stationName.length < MIN_LINE_NAME_LENGTH) {
    return alert(MIN_LINE_NAME_MSG);
  }
  if (stationName.length > MAX_LINE_NAME_LENGTH) {
    return alert(MAX_LINE_NAME_MSG);
  }
  return true;
};
