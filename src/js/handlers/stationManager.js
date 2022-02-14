import {
  MIN_STATION_NAME_MSG,
  MAX_STATION_NAME_MSG,
  REMOVE_CONFIRM_MSG,
} from '../constants/message.js';
import { stations } from '../states/stations.js';
import {
  MIN_STATION_NAME_LENGTH,
  MAX_STATION_NAME_LENGTH,
} from '../constants/constant.js';
import { $ } from '../utils/DOM.js';

export let targetStation = '';

export const initState = () => {
  stations.init();
};

export const initEvent = () => {
  $('#station-register-form').addEventListener('submit', handleStationRegister);
  $('#station-name-update-form').addEventListener(
    'submit',
    handleStationUpdate,
  );
  $('#stationList').addEventListener('click', handleStationControl);
  $('.modal-close').addEventListener('click', onModalClose);
};

const onModalShow = () => {
  $('.modal').classList.add('open');
};

const onModalClose = () => {
  $('.modal').classList.remove('open');
};

const checkNameRegulations = stationName => {
  if (stationName.length < MIN_STATION_NAME_LENGTH) {
    return alert(MIN_STATION_NAME_MSG);
  }
  if (stationName.length > MAX_STATION_NAME_LENGTH) {
    return alert(MAX_STATION_NAME_MSG);
  }
  return true;
};

const handleStationRegister = e => {
  e.preventDefault();

  const stationName = e.target.elements['station-name-input'].value;

  if (checkNameRegulations(stationName)) {
    stations.add(stationName);
    e.target.elements['station-name-input'].value = '';
  }
};

const handleStationUpdate = e => {
  e.preventDefault();

  const newStation = $('#station-name-update-input').value;

  if (checkNameRegulations(newStation)) {
    stations.update(targetStation, newStation);
    onModalClose();
  }
};

const handleStationControl = ({ target }) => {
  const type = target.id;
  if (!['update', 'remove'].includes(type)) return;

  targetStation = target.closest('li').querySelector('#station-name').innerText;

  if (type === 'update') {
    onModalShow();
    $('#station-name-update-input').value = targetStation;
  }
  if (type === 'remove') {
    // 이미 노선에 추가된 역인지 추가 확인 필요
    if (!window.confirm(REMOVE_CONFIRM_MSG.station)) return;
    stations.remove(targetStation);
  }
};
