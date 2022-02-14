import { LINE_LIST } from '../constants/localStorage.js';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage.js';
import { renderLineList } from '../viewController/subway.js';
import { LINE_DUPLICATE_MSG } from '../constants/message.js';
import { onModalClose } from '../ui/modal/index.js';
import { $ } from '../utils/DOM.js';

export const lines = {
  value: [],

  init() {
    this.set(getLocalStorage(LINE_LIST) ?? []);
  },

  get() {
    return this.value;
  },

  getLineInfo(targetLineName) {
    const targetLineInfo = this.value.filter(
      ({ name }) => name === targetLineName,
    )[0];
    return targetLineInfo;
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
  },

  update(targetLineName, newLine) {
    const oldLines = [...this.value];
    const newLines = oldLines.map(oldLine => {
      const { name } = oldLine;
      return name === targetLineName ? newLine : oldLine;
    });
    this.set(newLines);
  },

  remove(targetLineName) {
    const oldLines = [...this.value];
    const newLines = oldLines.filter(
      lineInfo => lineInfo.name !== targetLineName,
    );

    this.set(newLines);
  },
};
