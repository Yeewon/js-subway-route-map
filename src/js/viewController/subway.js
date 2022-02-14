import { $ } from '../utils/DOM.js';
import { createStationListTemplate } from '../templates/stationList.js';
import { createLineListTemplate } from '../templates/lineList.js';
import { createSectionListTemplate } from '../templates/sectionList.js';
import {
  registerButtonTemplate,
  updateButtonTemplate,
} from '../templates/lineModalSubmitButton.js';
import { createStationSelectTemplate } from '../templates/stationSelect.js';

export const renderStationList = stationList => {
  $('#stationList').innerHTML = createStationListTemplate(stationList);
};

export const renderLineList = lineList => {
  $('#lineList').innerHTML = createLineListTemplate(lineList);
};

export const renderSectionList = sectionList => {
  $('#section-list').innerHTML = createSectionListTemplate(sectionList);
};

export const renderLineModalButton = (type = 'register') => {
  $('#line-submit').innerHTML =
    type === 'register' ? registerButtonTemplate : updateButtonTemplate;
};

export const renderLineSelect = (targetId = '', lineNameList) => {
  $(`#${targetId}`).insertAdjacentHTML(
    'beforeend',
    createStationSelectTemplate(lineNameList),
  );
};

export const renderStationSelect = (targetId = '', stationList) => {
  $(`#${targetId}`).insertAdjacentHTML(
    'beforeend',
    createStationSelectTemplate(stationList),
  );
};
