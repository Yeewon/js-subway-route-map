import { colorOptions } from '/src/js/utils/mock.js';
import { $ } from '../utils/DOM.js';
import { createStationSelectTemplate } from '../templates/stationSelect.js';
import { STATION_LIST } from '../constants/localStorage.js';
import { getLocalStorage } from '../utils/localStorage.js';
import { REMOVE_CONFIRM_MSG } from '../constants/message.js';
import { lines } from '../states/lines.js';
import { checkNameRegulations } from '../utils/checkRegulations.js';
import { onModalClose, onModalShow } from '../ui/modal/index.js';
import { renderLineModalButton } from '../viewController/subway.js';

let targetLineName = null;

export const initState = () => {
  setColorSelector();
  setStationSelect();
  lines.init();
};

export const initEvent = () => {
  $('.create-line-btn').addEventListener('click', onRegisterModalShow);
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
  console.log(targetLineName);
  targetLineName ? lines.update(targetLineName, newLine) : lines.add(newLine);
  onModalClose();
};

const handleLineControl = ({ target }) => {
  const type = target.id;
  if (!['update', 'remove'].includes(type)) return;

  targetLineName = target
    .closest('li')
    .querySelector('.subway-line-list-item-name').innerText;

  if (type === 'update') {
    onModalShow();
    setUpdateModal(targetLineName);
  }
  if (type === 'remove') {
    if (!window.confirm(REMOVE_CONFIRM_MSG.line)) return;
    lines.remove(targetLineName);
  }
};

const handleColorSelector = e => {
  const color = e.target.classList[1];
  $('#subway-line-color').value = color;
};

const setStationSelect = () => {
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

const setColorSelector = () => {
  $('.subway-line-color-selector').innerHTML = colorOptions
    .map(subwayLineColorOptionTemplate)
    .join('');
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

const setUpdateModal = targetLineName => {
  const targetLineInfo = lines.getLineInfo(targetLineName);
  const { name, upStation, downStation, distance, duration, color } =
    targetLineInfo;

  renderLineModalButton('update');

  $('#modal-title').innerText = '🛤️ 노선 수정';
  $('#subway-line-name').value = name;
  $('#up-station').value = upStation;
  $('#down-station').value = downStation;
  $('#distance').value = distance;
  $('#duration').value = duration;
  $('#subway-line-color').value = color;
};

const onRegisterModalShow = () => {
  targetLineName = null;
  renderLineModalButton('register');
  $('#line-register-form').reset();
};
