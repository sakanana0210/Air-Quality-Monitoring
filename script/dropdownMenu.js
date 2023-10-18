import { getNewMap } from './map.js';

let url = "https://data.moenv.gov.tw/api/v2/aqx_p_488?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&sort=datacreationdate%20desc&format=JSON";
let records;
let dataTest;
let timeList;
let areaMap = [
	{ "北部空品區":[ { "基隆市":[] }, { "臺北市":[] }, { "新北市":[] }, { "桃園市":[] } ] },
	{ "竹苗空品區":[ {"新竹市":[]}, {"新竹縣":[]}, {"苗栗縣":[]} ] },
	{ "中部空品區":[ {"臺中市":[]}, {"南投縣":[]}, {"彰化縣":[]} ] },
	{ "雲嘉南空品區":[ {"雲林縣":[]}, {"嘉義市":[]}, {"嘉義縣":[]}, {"臺南市":[]} ] },
	{ "高屏空品區":[ {"高雄市":[]}, {"屏東縣":[]} ] },
	{ "宜蘭空品區":[ {"宜蘭縣":[]} ] },
	{ "花東空品區":[ {"花蓮縣":[]}, {"臺東縣":[]} ] },
	{ "其他":[ {"澎湖縣":[]}, {"金門縣":[]}, {"連江縣":[]} ] }
];
let areaList = areaMap.map(areaItem => Object.keys(areaItem)[0]);
let cityObjList;
const defaultIndex = 0;
const areaSelectionElement = document.getElementById("area_select");
const citySelectionElement = document.getElementById("city_select");
const siteSelectionElement = document.getElementById("site_select");
const timeSelectionElement = document.getElementById("time_select");
const searchBtn = document.getElementById("search_button");

async function initSetting(url) {
    let response = await fetch(url);
    let data = await response.json()
	dataTest = data
	records = data["records"];
	timeList = records.filter(recordItem => {
						return recordItem.sitename === records[0].sitename;
					}).map(recordItem => {
						return recordItem.datacreationdate;
					});

	// Get site list of county
	for(let index = 0; index < areaMap.length; index++) {
		setCountySite(areaMap[index][areaList[index]]);
	}

	// fill default options
	setDefaultOptions()
}

function setCountySite(area) {
	for(let index = 0; index < area.length; index++) {
		let county = area[index];
		let countyName = Object.keys(county)[0];

		county[countyName] = records.filter(recordItem => {
									return recordItem.county === countyName && recordItem.datacreationdate === timeList[0];
								}).map(recordItem => {
									return recordItem.sitename
								});
	}
}

function setDefaultOptions() {
	let newOption;

	// area options
	for(let areaIndex = 0; areaIndex < areaList.length; areaIndex++) {
		newOption = document.createElement("option");
		newOption.value = newOption.textContent = areaList[areaIndex];
		areaSelectionElement.appendChild(newOption);
	}

	// set city options and site options after setting default area
	setAreaChangedAction();

	// time options
	setTimeList();
}

function setAreaChangedAction() {
	let selectedArea = areaSelectionElement.value;
	cityObjList = areaMap.find(areaItem => {
							return Object.keys(areaItem)[0] === selectedArea
						})[selectedArea];
	let cityList = cityObjList.map(cityItem => Object.keys(cityItem)[0]);
	let siteList = cityObjList[defaultIndex][cityList[defaultIndex]];

	setCityOptions(cityList);
	setSiteOptions(siteList);
}

function setCityChangedAction() {
	let selectedCity = citySelectionElement.value;
	let siteList = cityObjList.find(cityItem => {
								return Object.keys(cityItem)[0] === selectedCity;
							})[selectedCity];
	setSiteOptions(siteList);
}

function setCityOptions(cityList) {
	let newOption;
	citySelectionElement.innerHTML = "";
	for(let cityIndex = 0; cityIndex < cityList.length; cityIndex++) {
		newOption = document.createElement("option");
		newOption.value = newOption.textContent = cityList[cityIndex];
		citySelectionElement.appendChild(newOption);
	}
}

function setSiteOptions(siteList) {
	let newOption;
	siteSelectionElement.innerHTML = "";
	for(let siteIndex = 0; siteIndex < siteList.length; siteIndex++) {
		newOption = document.createElement("option");
		newOption.value = newOption.textContent = siteList[siteIndex];
		siteSelectionElement.appendChild(newOption);
	}
}

function setTimeList() {
	let newOption;
	for(let timeIndex = 0; timeIndex < timeList.length; timeIndex++) {
		newOption = document.createElement("option");
		newOption.value = newOption.textContent = timeList[timeIndex];
		timeSelectionElement.appendChild(newOption);
	}
}

function setSearchActions() {
	let settingTime = timeSelectionElement.value;
	getNewMap(settingTime);
}

// Change select actions
areaSelectionElement.addEventListener('change', setAreaChangedAction);
citySelectionElement.addEventListener('change', setCityChangedAction);

// Search
searchBtn.addEventListener('click', setSearchActions);

initSetting(url);