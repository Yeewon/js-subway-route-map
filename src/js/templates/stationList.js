export const createStationListTemplate = (stationList) => {
    return `${stationList
        .map((stationName) => stationListTemplate(stationName))
        .reverse()
        .join('')}`;
};

const stationListTemplate = (stationName) => {
    return `
    <li class="station-list-item d-flex items-center py-2">
        <div id="station-name" class="w-100 pl-2">${stationName}</div>
        <button type="button" id="update" class="bg-gray-50 text-gray-500 text-sm mr-1">수정</button>
        <button type="button" id="remove" class="bg-gray-50 text-gray-500 text-sm">삭제</button>
    </li>
    <hr class="my-0" />`;
};
