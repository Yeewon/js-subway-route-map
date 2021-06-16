import {STATION_LIST} from '../constants/localStorage.js';
import {getLocalStorage, setLocalStorage} from '../utils/localStorage.js';
import {renderStationList} from '../viewController/subway.js';
import {NAME_DUPLICATE_MSG} from '../constants/message.js';

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
        const targetIdx = this.value.indexOf(newStation);

        if (targetIdx !== -1) {
            return alert(NAME_DUPLICATE_MSG);
        }
        //중복되는 값이 없다면
        this.value.push(newStation);
        setLocalStorage(STATION_LIST, this.value ?? []);
        renderStationList(this.value);
    },

    remove(targetStation) {
        const oldStationList = [...this.value];
        const newStationList = oldStationList.filter((station) => station !== targetStation);
        this.set(newStationList);
        setLocalStorage(STATION_LIST, newStationList);
    },
};
