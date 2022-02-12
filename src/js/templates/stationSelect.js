export const createStationSelectTemplate = stationList => {
  return `${stationList
    .map(stationName => stationSelectTemplate(stationName))
    .reverse()
    .join('')}`;
};

const stationSelectTemplate = stationName => {
  return `<option>${stationName}</option>`;
};
