import { LINE_LIST } from '../constants/localStorage.js';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage.js';
import { renderLineList } from '../viewController/subway.js';
import { LINE_DUPLICATE_MSG } from '../constants/message.js';
import { onModalClose, onModalShow } from '../ui/modal/index.js';
import { $ } from '../utils/DOM.js';

export const lines = {
  value: [],

  init() {
    this.set(getLocalStorage(LINE_LIST) ?? []);
  },

  get() {
    return this.value;
  },

  set(newLines = []) {
    this.value = newLines;
    setLocalStorage(LINE_LIST, newLines ?? []);
    renderLineList(newLines);
  },

  add(newLine = {}) {
    const isDuplicate = !!this.value.filter(({ name }) => name === newLine.name)
      .length;
    if (isDuplicate) {
      return alert(LINE_DUPLICATE_MSG);
    }

    const newLines = [...this.value, newLine];
    this.set(newLines);

    $('#line-register-form').reset();
    onModalClose();
  },

  update(targetLineName) {
    onModalShow();
    // click한 노선의 정보를 띄워줌.
    const oldLineList = [...this.value];
    const targetLineInfo = oldLineList.filter(
      lineInfo => lineInfo.name === targetLineName,
    )[0];
    this.modalSetting(targetLineInfo);
  },

  remove(targetLineName) {
    const oldLineList = [...this.value];
    const newLineList = oldLineList.filter(
      lineInfo => lineInfo.name !== targetLineName,
    );

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
