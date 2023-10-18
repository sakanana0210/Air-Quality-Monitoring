let map = L.map('map').setView([23.8, 120.9605], 7.5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let greenCircleStyle = {
    radius: 20,
    color: 'black',
    fillColor: 'green',
    fillOpacity: 1,
    weight: 1
};

let orangeCircleStyle = {
    radius: 20,
    color: 'black',
    fillColor: 'orange',
    fillOpacity: 1,
    weight: 1
};

let yellowCircleStyle = {
    radius: 20,
    color: 'black',
    fillColor: 'yellow',
    fillOpacity: 1,
    weight: 1
};

let redCircleStyle = {
    radius: 20,
    color: 'black',
    fillColor: 'red',
    fillOpacity: 1,
    weight: 1
};

function fetchForMap() {
    return fetch('https://data.moenv.gov.tw/api/v2/aqx_p_488?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&sort=datacreationdate%20desc&format=JSON')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            let groupedData = [];
            data["records"].forEach(record => {
                let time = record["datacreationdate"];
                let sitename = record["sitename"];
                let aqi = record["aqi"];
                let county = record["county"];
                let latitude = record["latitude"];
                let longitude = record["longitude"];
                let existingGroup = groupedData.find(group => group.time === time);
                if (existingGroup) {
                    existingGroup.data.push({
                        "sitename": sitename,
                        "aqi": aqi,
                        "latitude": latitude,
                        "longitude": longitude,
                        "county": county
                    });
                } else {
                    let newGroup = {
                        "time": time,
                        "data": [{
                            "sitename": sitename,
                            "aqi": aqi,
                            "latitude": latitude,
                            "longitude": longitude,
                            "county": county
                        }]
                    };
                    groupedData.push(newGroup);
                }
            });
        return groupedData;
    });
}

function createCircle(data, time) {
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
            map.removeLayer(layer);
        }
    });
    data.forEach(function(group) {
        if (group.time === time) {
            let selectDatas = group.data;
            selectDatas.forEach(function(selectData) {
                let name = selectData.sitename;
                let aqi = selectData.aqi;
                let county = selectData.county;
                let point = [selectData.latitude, selectData.longitude];
                let color;
                let textStyle;
                if (aqi > 150) {
                    color = redCircleStyle;
                    textStyle = "circle-text-red"
                } else if (aqi > 100) {
                    color = orangeCircleStyle;
                    textStyle = "circle-text-orange"
                } else if (aqi > 50) {
                    color = yellowCircleStyle;
                    textStyle = "circle-text-yellow"
                } else {
                    color = greenCircleStyle;
                    textStyle = "circle-text-green"
                }
                let circle = L.circleMarker(point, color).addTo(map);

                let tooltip = L.tooltip({
                    permanent: true,
                    direction: 'center',
                    className: textStyle
                }).setContent(aqi);
                circle.bindTooltip(tooltip).openTooltip();
                
                circle.on('click', function(event) {
                    let tooltip2 = L.tooltip({
                        direction: 'top',
                        className: 'nameStyle'
                    }).setContent(name);
                    tooltip2.setLatLng(point);
                    map.openTooltip(tooltip2);
                    document.dispatchEvent(new CustomEvent('markerClicked', { detail: { name: name, county: county } }));
                });

            });
        }
    });
}

// Click map select change
document.addEventListener('markerClicked', function(event) {
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
    let markerCity = event.detail.county;
    let markerName = event.detail.name;
    const areaSelectionElement = document.getElementById("area_select");
    const citySelectionElement = document.getElementById("city_select");
    const siteSelectionElement = document.getElementById("site_select");
    let district = '';
    for (let i = 0; i < areaMap.length; i++) {
        let areaObject = areaMap[i];
        let areaName = Object.keys(areaObject)[0];
        let cityObject = areaObject[areaName].find(cityItem => {
            return Object.keys(cityItem)[0] === markerCity;
        });
        if (cityObject) {
            district = areaName;
            break;
        }
    }
    areaSelectionElement.value = district;
    let changeEvent = new Event('change');
    areaSelectionElement.dispatchEvent(changeEvent);
    citySelectionElement.value = markerCity;
    citySelectionElement.dispatchEvent(changeEvent);
        siteSelectionElement.value = markerName;
    siteSelectionElement.dispatchEvent(changeEvent);
});

// 將mapDatas[0]["time"]改掉可取得其他時間的地圖標記
fetchForMap().then(mapDatas => {
    createCircle(mapDatas, mapDatas[0]["time"]);
})