import {$} from '../utils/DOM.js';
import {createStationListTemplate} from '../templates/stationList.js';

export const renderStationList = (stationList) => {
    $('#stationList').innerHTML = createStationListTemplate(stationList);
};
