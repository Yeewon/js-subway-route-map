export const createSectionListTemplate = (sectionList) => {
  const stationNameList = [];
  sectionList.map((section) => {
    section.map((stationName) => {
      if (stationNameList.indexOf(stationName) === -1)
        stationNameList.push(stationName);
    });
  });

  return `${stationNameList
    .map((stationName) => sectionListTemplate(stationName))
    .reverse()
    .join("")}`;
};

const sectionListTemplate = (stationName) => {
  return `
    <li class="section-list-item d-flex items-center py-2">
        <div id="section-name" class="w-100 pl-2">${stationName}</div>
        <button type="button" id="update" class="bg-gray-50 text-gray-500 text-sm mr-1">수정</button>
        <button type="button" id="remove" class="bg-gray-50 text-gray-500 text-sm">삭제</button>
    </li>
    <hr class="my-0" />`;
};
