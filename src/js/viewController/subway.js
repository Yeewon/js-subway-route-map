import { $ } from '../utils/DOM.js';
import { createStationListTemplate } from '../templates/stationList.js';
import { createLineListTemplate } from '../templates/lineList.js';
import { createSectionListTemplate } from '../templates/sectionList.js';

export const renderStationList = stationList => {
  $('#stationList').innerHTML = createStationListTemplate(stationList);
};

export const renderLineList = lineList => {
  $('#lineList').innerHTML = createLineListTemplate(lineList);
};

export const renderSectionList = sectionList => {
  $('#section-list').innerHTML = createSectionListTemplate(sectionList);
};
