import {navigationTemplate} from '../templates/navigation.js';
import {MIN_STATION_NAME_MSG, MAX_STATION_NAME_MSG, REMOVE_CONFIRM_MSG} from '../constants/message.js';
import {stations} from '../states/stations.js';
import {$} from '../utils/DOM.js';

const initState = () => {
    stations.init();
};

const checkNameRegulations = (stationName) => {
    if (stationName.length < 2) return alert(MIN_STATION_NAME_MSG);
    if (stationName.length > 20) return alert(MAX_STATION_NAME_MSG);
    return true;
};
const handleStationRegister = (e) => {
    e.preventDefault();
    console.log(e.target);
    const stationName = e.target.elements['station-name-input'].value;

    if (!checkNameRegulations(stationName)) return;
    stations.add(stationName);
};

document.querySelector('header').innerHTML = navigationTemplate;
window.addEventListener('submit', handleStationRegister);
initState();
