import { STATION_LIST } from '../constants/localStorage.js';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage.js';
import { renderStationList } from '../viewController/subway.js';
import { STATION_DUPLICATE_MSG } from '../constants/message.js';
import { $ } from '../utils/DOM.js';

export const stations = {
  value: [],

  init() {
    this.set(getLocalStorage(STATION_LIST) ?? []);
  },

  get() {
    return this.value;
  },

  set(newStations = []) {
    this.value = newStations;
    setLocalStorage(STATION_LIST, newStations);
    renderStationList(this.value);
  },

  add(newStation = '') {
    if (this.value.includes(newStation)) {
      return alert(STATION_DUPLICATE_MSG);
    }
    const newStations = [...this.value, newStation];
    this.set(newStations);
  },

  update(targetStation, newStation) {
    const targetStationIdx = this.value.indexOf(targetStation);
    const newStations = [...this.value];

    newStations[targetStationIdx] = newStation;
    this.set(newStations);
  },

  remove(targetStation) {
    const oldStationList = [...this.value];
    const newStations = oldStationList.filter(
      station => station !== targetStation,
    );

    this.set(newStations);
  },
};
