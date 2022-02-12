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
    renderStationList(this.value);
  },

  add(newStation = '') {
    if (this.value.includes(newStation)) {
      return alert(STATION_DUPLICATE_MSG);
    }
    const newValue = [...this.value, newStation];
    setLocalStorage(STATION_LIST, newValue ?? []);
    this.set(newValue);
  },

  update(targetStation) {
    const targetStationIdx = this.value.indexOf(targetStation);
    const updatedStation = $('#station-name-update-input').value;

    this.value[targetStationIdx] = updatedStation;
    setLocalStorage(STATION_LIST, this.value ?? []);
    renderStationList(this.value);

    $('.modal').classList.remove('open');
  },

  remove(targetStation) {
    const oldStationList = [...this.value];
    const newStationList = oldStationList.filter(
      station => station !== targetStation,
    );

    this.set(newStationList);
    setLocalStorage(STATION_LIST, newStationList);
  },
};
