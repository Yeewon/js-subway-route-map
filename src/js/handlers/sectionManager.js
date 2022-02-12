import { $ } from "../utils/DOM.js";
import { LINE_LIST, STATION_LIST } from "../constants/localStorage.js";
import { createStationSelectTemplate } from "../templates/stationSelect.js";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage.js";
import { onModalClose } from "../ui/modal/index.js";
import { renderSectionList } from "../viewController/subway.js";

export const stationList = getLocalStorage(STATION_LIST);
export const lineList = getLocalStorage(LINE_LIST);

export const initState = () => {
  const lineNameList = [];
  lineList.map((lineInfo) => lineNameList.push(lineInfo.name));
  $("#subway-line-for-section").insertAdjacentHTML(
    "beforeend",
    createStationSelectTemplate(lineNameList)
  );
  $("#subway-line").insertAdjacentHTML(
    "beforeend",
    createStationSelectTemplate(lineNameList)
  );

  $("#up-station").insertAdjacentHTML(
    "beforeend",
    createStationSelectTemplate(stationList)
  );
  $("#down-station").insertAdjacentHTML(
    "beforeend",
    createStationSelectTemplate(stationList)
  );
};

export const initEvent = () => {
  $("#subway-line").addEventListener("change", handleLineSelect);
  $("#line-register-form").addEventListener("submit", handleLineRegister);
};

const handleLineSelect = (e) => {
  const selectedLineInfo = getSelectedLineInfo();

  $("#subway-line").className = selectedLineInfo.color;
  renderSectionList(selectedLineInfo.section);
};

const handleLineRegister = (e) => {
  e.preventDefault();

  const lineName = $("#subway-line-for-section").value;
  const upStation = $("#up-station").value;
  const downStation = $("#down-station").value;
  const selectedLineInfo = getSelectedLineInfo();

  lineList.map((lineInfo) => {
    if (lineInfo.name === lineName)
      return lineInfo.section.push([upStation, downStation]);
  });
  setLocalStorage(LINE_LIST, lineList ?? []);
  renderSectionList(selectedLineInfo.section);
  onModalClose();
};

const getSelectedLineInfo = () => {
  const selectedLine = $("#subway-line").value;
  const selectedLineInfo = lineList.filter(
    (lineInfo) => lineInfo.name === selectedLine
  )[0];

  return selectedLineInfo;
};
