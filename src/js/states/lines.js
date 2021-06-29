import {LINE_LIST} from '../constants/localStorage.js';
import {getLocalStorage, setLocalStorage} from '../utils/localStorage.js';
import {renderLineList} from '../viewController/subway.js';
import {LINE_DUPLICATE_MSG} from '../constants/message.js';
import {onModalClose, onModalShow} from '../ui/modal/index.js';
import {$} from '../utils/DOM.js';

export const lines = {
    value: [],

    init() {
        this.set(getLocalStorage(LINE_LIST) ?? []);
    },

    get() {
        return this.value;
    },

    set(newLine = []) {
        this.value = newLine;
        renderLineList(this.value);
    },

    add(newLine = {}) {
        const targetIdx = this.value.indexOf(newLine);
        if (targetIdx > -1) return alert(LINE_DUPLICATE_MSG);

        //중복되는 값이 없다면
        this.value.push(newLine);
        console.log(this.value);
        setLocalStorage(LINE_LIST, this.value ?? []);
        renderLineList(this.value);
        $('#line-register-form').reset();
        onModalClose();
    },

    update(targetLineName) {
        onModalShow();
        // click한 노선의 정보를 띄워줌.
        const oldLineList = [...this.value];
        const targetLineInfo = oldLineList.filter((lineInfo) => lineInfo.name === targetLineName)[0];
        this.modalSetting(targetLineInfo);
    },
    remove(targetLineName) {
        const oldLineList = [...this.value];
        const newLineList = oldLineList.filter((lineInfo) => lineInfo.name !== targetLineName);

        this.set(newLineList);
        setLocalStorage(LINE_LIST, newLineList);
        renderLineList(this.value);
    },
    modalSetting(targetLineInfo) {
        // $('#modal-title').innerText = '🛤️ 노선 수정';

        $('#subway-line-name').value = targetLineInfo.name;
        $('#up-station').value = targetLineInfo.upStation;
        $('#down-station').value = targetLineInfo.downStation;
        $('#distance').value = targetLineInfo.distance;
        $('#duration').value = targetLineInfo.duration;
        $('#subway-line-color').value = targetLineInfo.color;
    },
};
