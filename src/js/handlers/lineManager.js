import { colorOptions } from '/src/js/utils/mock.js';
import { $ } from '../utils/DOM.js';
import { createStationSelectTemplate } from '../templates/stationSelect.js';
import { STATION_LIST } from '../constants/localStorage.js';
import { getLocalStorage } from '../utils/localStorage.js';
import { REMOVE_CONFIRM_MSG } from '../constants/message.js';
import { lines } from '../states/lines.js';
import { checkNameRegulations } from '../utils/checkRegulations.js';

export const initState = () => {
  setColorSelector();
  setModalInfo();
  lines.init();
};

export const initEvent = () => {
  $('#line-register-form').addEventListener('submit', handleLineRegister);
  $('.subway-line-color-selector').addEventListener(
    'click',
    handleColorSelector,
  );

  $('#lineList').addEventListener('click', handleLineControl);
};

const handleLineRegister = e => {
  e.preventDefault();

  const lineName = $('#subway-line-name').value;
  if (!checkNameRegulations(lineName)) return;

  const newLine = setLineInfo();
  lines.add(newLine);
};

const handleLineControl = e => {
  e.preventDefault();

  if (e.target.id === 'update') return handleLineUpdate(e);
  else if (e.target.id === 'remove') return handleLineRemove(e);
};

const handleLineUpdate = e => {
  const targetLineName = e.target
    .closest('li')
    .querySelector('.subway-line-list-item-name').innerText;
  lines.update(targetLineName);
};

const handleLineRemove = e => {
  const targetLineName = e.target
    .closest('li')
    .querySelector('.subway-line-list-item-name').innerText;
  if (!window.confirm(REMOVE_CONFIRM_MSG.line)) return;
  lines.remove(targetLineName);
};

const handleColorSelector = e => {
  const color = e.target.classList[1];
  $('#subway-line-color').value = color;
};

const setColorSelector = () => {
  $('.subway-line-color-selector').innerHTML = colorOptions
    .map(subwayLineColorOptionTemplate)
    .join('');
};

const setModalInfo = () => {
  const stationList = getLocalStorage(STATION_LIST);
  $('#up-station').insertAdjacentHTML(
    'beforeend',
    createStationSelectTemplate(stationList),
  );
  $('#down-station').insertAdjacentHTML(
    'beforeend',
    createStationSelectTemplate(stationList),
  );
};

const subwayLineColorOptionTemplate = (color, index) => {
  const hasNewLine = (index + 1) % 7 === 0;
  return `<button id="color" type="button" class="color-option bg-${color}"></button> ${
    hasNewLine ? '<br/>' : ''
  }`;
};

const setLineInfo = () => ({
  name: $('#subway-line-name').value,
  upStation: $('#up-station').value,
  downStation: $('#down-station').value,
  distance: $('#distance').value,
  duration: $('#duration').value,
  color: $('#subway-line-color').value,
  section: [],
});
