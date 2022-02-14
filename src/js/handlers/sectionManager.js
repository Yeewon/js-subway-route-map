import { $ } from '../utils/DOM.js';
import { LINE_LIST, STATION_LIST } from '../constants/localStorage.js';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage.js';
import { onModalClose } from '../ui/modal/index.js';
import {
  renderLineSelect,
  renderSectionList,
  renderStationSelect,
} from '../viewController/subway.js';

export const stationList = getLocalStorage(STATION_LIST);
export const lineList = getLocalStorage(LINE_LIST);

export const initState = () => {
  const lineNameList = lineList.map(({ name }) => name);

  renderLineSelect('subway-line', lineNameList);
  renderLineSelect('subway-line-for-section', lineNameList);

  renderStationSelect('up-station', stationList);
  renderStationSelect('down-station', stationList);
};

export const initEvent = () => {
  $('#subway-line').addEventListener('change', handleLineSelect);
  $('#line-register-form').addEventListener('submit', handleLineRegister);
};

const handleLineSelect = e => {
  const { color, section } = getSelectedLineInfo();
  $('#subway-line').className = color;
  renderSectionList(section);
};

const handleLineRegister = e => {
  e.preventDefault();

  const lineName = $('#subway-line-for-section').value;
  const upStation = $('#up-station').value;
  const downStation = $('#down-station').value;

  // const selectedLineInfo = getSelectedLineInfo();

  // lineList.map(lineInfo => {
  //   if (lineInfo.name === lineName)
  //     return lineInfo.section.push([upStation, downStation]);
  // });
  // setLocalStorage(LINE_LIST, lineList ?? []);
  // renderSectionList(selectedLineInfo.section);
  onModalClose();
};

const getSelectedLineInfo = () => {
  const selectedLineName = $('#subway-line').value;
  const selectedLineInfo = lineList.filter(
    ({ name }) => name === selectedLineName,
  )[0];

  return selectedLineInfo;
};
