export const createLineListTemplate = (lineList) => {
    return `${lineList
        .map((lineInfo) => lineListTemplate(lineInfo))
        .reverse()
        .join('')}`;
};

const lineListTemplate = (lineInfo) => {
    return `
    <li class="d-flex items-center py-2 relative">
        <span class="subway-line-color-dot ${lineInfo.color}"></span>
        <span class="w-100 pl-6 subway-line-list-item-name">
        ${lineInfo.name}
        </span>
        <button
        id="update"
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1">
        수정
        </button>
        <button
        id="remove"
        type="button"
        class="bg-gray-50 text-gray-500 text-sm">
        삭제
        </button>
    </li>
    <hr class="my-0" />`;
};
