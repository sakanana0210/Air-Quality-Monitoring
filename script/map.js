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
                let latitude = record["latitude"];
                let longitude = record["longitude"];
                let existingGroup = groupedData.find(group => group.time === time);
                if (existingGroup) {
                    existingGroup.data.push({
                        "sitename": sitename,
                        "aqi": aqi,
                        "latitude": latitude,
                        "longitude": longitude
                    });
                } else {
                    let newGroup = {
                        "time": time,
                        "data": [{
                            "sitename": sitename,
                            "aqi": aqi,
                            "latitude": latitude,
                            "longitude": longitude
                        }]
                    };
                    groupedData.push(newGroup);
                }
            });
        return groupedData;
    });
}

function createCircle(data, time) {
    data.forEach(function(group) {
        if (group.time === time) {
            let selectDatas = group.data;
            selectDatas.forEach(function(selectData) {
                let name = selectData.sitename;
                let aqi = selectData.aqi;
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
                });

            });
        }
    });
}

// 將mapDatas[0]["time"]改掉可取得其他時間的地圖標記
fetchForMap().then(mapDatas => {
    createCircle(mapDatas, mapDatas[0]["time"]);
})