import {MIN_STATION_NAME_MSG, MAX_STATION_NAME_MSG, CONFIRM_MSG} from '../constants/message.js';
import {stations} from '../states/stations.js';
import {MIN_STATION_NAME_LENGTH, MAX_STATION_NAME_LENGTH} from '../constants/constant.js';
import {$} from '../utils/DOM.js';

export let targetStation = '';

export const initState = () => {
    stations.init();
};

export const initEvent = () => {
    $('#station-register-form').addEventListener('submit', handleStationRegister);
    $('#station-name-update-form').addEventListener('submit', handleStationUpdate);
    $('#stationList').addEventListener('click', handleStationControl);
    $('.modal-close').addEventListener('click', onModalClose);
};

const onModalClose = () => {
    $('.modal').classList.remove('open');
};

const checkNameRegulations = (stationName) => {
    if (stationName.length < MIN_STATION_NAME_LENGTH) return alert(MIN_STATION_NAME_MSG);
    if (stationName.length > MAX_STATION_NAME_LENGTH) return alert(MAX_STATION_NAME_MSG);
    return true;
};

const handleStationRegister = (e) => {
    e.preventDefault();

    const stationName = e.target.elements['station-name-input'].value;

    e.target.elements['station-name-input'].value = '';
    if (!checkNameRegulations(stationName)) return;
    stations.add(stationName);
};

const handleStationUpdate = (e) => {
    e.preventDefault();

    stations.update(targetStation);
};

const handleStationControl = (e) => {
    e.preventDefault();

    if (e.target.id === 'update') {
        targetStation = e.target.closest('li').querySelector('#station-name').innerText;

        $('#station-name-update-input').value = targetStation;
        $('.modal').classList.add('open');
    }

    if (e.target.id === 'remove') {
        const targetStationName = e.target.closest('li').querySelector('#station-name').innerText;
        if (!window.confirm(CONFIRM_MSG.station)) return;
        stations.remove(targetStationName);
    }
};
