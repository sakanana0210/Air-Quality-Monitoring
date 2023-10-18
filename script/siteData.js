let ApiUrlHour = "https://data.moenv.gov.tw/api/v2/aqx_p_432?api_key=57333135-175b-4b40-9866-c37d9a68215b";
let ApiUrlHalfDay = "https://data.moenv.gov.tw/api/v2/aqx_p_488?api_key=57333135-175b-4b40-9866-c37d9a68215b";

function initailData() { 
    fetch(ApiUrlHour)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let initailData = data.records[0]
            document.getElementById("site_name").textContent = initailData["sitename"];
            document.getElementById("site_time").textContent = initailData["publishtime"];
            document.getElementById("result_aqi").textContent = initailData["aqi"];
            document.getElementById("pollutant").textContent = initailData["pollutant"];
            document.getElementById("aqi_description").textContent = initailData["status"];
            document.getElementById("result_pm2dot5").textContent = initailData["pm2.5_avg"];
            document.getElementById("result_pm10").textContent = initailData["pm10_avg"];
            document.getElementById("result_O3").textContent = initailData["o3_8hr"];
            document.getElementById("result_CO").textContent = initailData["co_8hr"];
            document.getElementById("result_SO2").textContent = initailData["so2"];
            document.getElementById("result_NO2").textContent = initailData["no2"];
            document.getElementById("result_pm2dot5_concentration").textContent = initailData["pm2.5"];
            document.getElementById("result_pm10_concentration").textContent = initailData["pm10"];
            document.getElementById("result_ozone_concentration").textContent = initailData["o3"];
            document.getElementById("result_CO_concentration").textContent = initailData["co"];
            document.getElementById("result_wind_speed").textContent = initailData["wind_speed"];
            document.getElementById("result_wind_direct").textContent = initailData["wind_direc"];
            backgroundColorAqi(initailData["aqi"]);
            backgroundColorPm2dot5(initailData["pm2.5_avg"]);
            backgroundColorPm10(initailData["pm10_avg"]);
            backgroundColorO3(initailData["o3_8hr"]);
            backgroundColorCO(initailData["co_8hr"]);
            backgroundColorSO2(initailData["so2"]);
            backgroundColorNO2(initailData["no2"]);
        })
        .catch(error => {
            console.error(error);
        });
};

window.onload = initailData();

function searchData() {
    fetch(ApiUrlHalfDay)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let records = data.records
            let siteSelectElem = document.getElementById("site_select");
            let timeSelectElem = document.getElementById("time_select");
            let aqi = document.getElementById("result_aqi");
            let aqiDescription = document.getElementById("aqi_description");
            let pm2dot5 = document.getElementById("result_pm2dot5");
            let pm10 = document.getElementById("result_pm10");
            let o3 = document.getElementById("result_O3");
            let co = document.getElementById("result_CO");
            let so2 = document.getElementById("result_SO2");
            let no2 = document.getElementById("result_NO2");
            let pm2dot5Concentration = document.getElementById("result_pm2dot5_concentration");
            let pm10Concentration = document.getElementById("result_pm10_concentration");
            let ozoneConcentration = document.getElementById("result_ozone_concentration");
            let coConcentration = document.getElementById("result_CO_concentration");
            let windSpeed = document.getElementById("result_wind_speed");
            let windDirect = document.getElementById("result_wind_direct");
            document.getElementById("search_button").addEventListener("click", function() {
                let selectedSiteValue = siteSelectElem.value;
                let selectedTimeValue = timeSelectElem.value; 
    
            for (let i = 0; i < records.length; i++) {
                if (records[i].sitename === selectedSiteValue && records[i].datacreationdate === selectedTimeValue) {
                    aqi.textContent = `${records[i]["aqi"]}`;
                    aqiDescription.textContent = `${records[i].status}`;
                    pm2dot5.textContent = `${records[i]["pm2.5_avg"]}`;
                    pm10.textContent = `${records[i]["pm10_avg"]}`;
                    o3.textContent = `${records[i]["o3_8hr"]}`;
                    co.textContent = `${records[i]["co_8hr"]}`;
                    so2.textContent = `${records[i]["so2"]}`;
                    no2.textContent = `${records[i]["no2"]}`;
                    pm2dot5Concentration.textContent = `${records[i]["pm2.5"]}`;
                    pm10Concentration.textContent = `${records[i]["pm10"]}`;
                    ozoneConcentration.textContent = `${records[i]["o3"]}`;
                    coConcentration.textContent = `${records[i]["co"]}`;
                    windSpeed.textContent = `${records[i]["windspeed"]}`;
                    windDirect.textContent = `${records[i]["winddirec"]}`;
                    backgroundColorAqi(aqi.textContent);
                    backgroundColorPm2dot5(pm2dot5.textContent);
                    backgroundColorPm10(pm10.textContent);
                    backgroundColorO3(o3.textContent);
                    backgroundColorCO(co.textContent);
                    backgroundColorSO2(so2.textContent);
                    backgroundColorNO2(no2.textContent);
                    return;
                }
            }
        });
    });
}


function backgroundColorAqi(aqi){
    let container = document.getElementById("aqi_box");
    if (aqi >= 0 && aqi <= 50) {
        container.style.backgroundColor = "#E5F4EF";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #009865";
    } else if (aqi >= 51 && aqi <= 100) {
        container.style.backgroundColor = "#FFFFEA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #FFFB26";
    } else if (aqi >= 101 && aqi <= 150) {
        container.style.backgroundColor = "#FEF4EA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #FF9734";
    } else if (aqi >= 151 && aqi <= 200) {
        container.style.backgroundColor = "#FAE5EA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #CA0034";
    } else if (aqi >= 201 && aqi <= 300) {
        container.style.backgroundColor = "#F0E5F5";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #670099";
    } else if (aqi >= 301 && aqi <= 500) {
        container.style.backgroundColor = "#F1E5E9";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #7E0123";
    } else {
        container.style.backgroundColor = "white";
    }
}

function backgroundColorPm2dot5(pm2dot5){
    let container = document.getElementById("pm2dot5_box");
    if (pm2dot5 >= 0 && pm2dot5 <= 15.4) {
        container.style.backgroundColor = "#E5F4EF";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #009865";
    } else if (pm2dot5 >= 1.55 && pm2dot5 <= 35.4) {
        container.style.backgroundColor = "#FFFFEA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #FFFB26";
    } else if (pm2dot5 >= 35.5 && pm2dot5 <= 54.4) {
        container.style.backgroundColor = "#FEF4EA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #FF9734";
    } else if (pm2dot5 >= 54.5 && pm2dot5 <= 150.4) {
        container.style.backgroundColor = "#FAE5EA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #CA0034";
    } else if (pm2dot5 >= 150.5 && pm2dot5 <= 250.4) {
        container.style.backgroundColor = "#F0E5F5";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #670099";
    } else if (pm2dot5 >= 250.5 && pm2dot5 <= 350.4) {
        container.style.backgroundColor = "#F1E5E9";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #7E0123";
    } else {
        container.style.backgroundColor = "white";
    }
}

function backgroundColorPm10(pm10){
    let container = document.getElementById("pm10_box");
    if (pm10 >= 0 && pm10 <= 54) {
        container.style.backgroundColor = "#E5F4EF";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #009865";
    } else if (pm10 >= 55 && pm10 <= 125) {
        container.style.backgroundColor = "#FFFFEA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #FFFB26";
    } else if (pm10 >= 126 && pm10 <= 254) {
        container.style.backgroundColor = "#FEF4EA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #FF9734";
    } else if (pm10 >= 255 && pm10 <= 354) {
        container.style.backgroundColor = "#FAE5EA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #CA0034";
    } else if (pm10 >= 355 && pm10 <= 424) {
        container.style.backgroundColor = "#F0E5F5";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #670099";
    } else if (pm10 >= 425 && pm10 <= 504) {
        container.style.backgroundColor = "#F1E5E9";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #7E0123";
    } else {
        container.style.backgroundColor = "white";
    }
}

function backgroundColorO3(o3){
    let container = document.getElementById("O3_box");
    if (o3 >= 0.000 && o3 <= 0.0054) {
        container.style.backgroundColor = "#E5F4EF";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #009865";
    } else if (o3 >= 0.055 && o3 <= 0.070) {
        container.style.backgroundColor = "#FFFFEA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #FFFB26";
    } else if (o3 >= 0.071 && o3 <= 0.085) {
        container.style.backgroundColor = "#FEF4EA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #FF9734";
    } else if (o3 >= 0.086 && o3 <= 0.105) {
        container.style.backgroundColor = "#FAE5EA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #CA0034";
    } else if (o3 >= 0.106 && o3 <= 0.2) {
        container.style.backgroundColor = "#F0E5F5";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #670099";
    } else if (o3 >= 0.2) {
        container.style.backgroundColor = "#F1E5E9";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #7E0123";
    } else {
        container.style.backgroundColor = "white";
    }
}

function backgroundColorCO(co){
    let container = document.getElementById("CO_box");
    if (co >= 0 && co <= 4.4) {
        container.style.backgroundColor = "#E5F4EF";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #009865";
    } else if (co >= 4.5 && co <= 9.4) {
        container.style.backgroundColor = "#FFFFEA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #FFFB26";
    } else if (co >= 9.5 && co <= 12.4) {
        container.style.backgroundColor = "#FEF4EA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #FF9734";
    } else if (co >= 12.5 && co <= 15.4) {
        container.style.backgroundColor = "#FAE5EA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #CA0034";
    } else if (co >= 15.5 && co <= 30.4) {
        container.style.backgroundColor = "#F0E5F5";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #670099";
    } else if (co >= 30.5 && co <= 40.4) {
        container.style.backgroundColor = "#F1E5E9";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #7E0123";
    } else {
        container.style.backgroundColor = "white";
    }
}

function backgroundColorSO2(so2){
    let container = document.getElementById("SO_box");
    if (so2 >= 0 && so2 <= 35) {
        container.style.backgroundColor = "#E5F4EF";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #009865";
    } else if (so2 >= 36 && so2 <= 75) {
        container.style.backgroundColor = "#FFFFEA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #FFFB26";
    } else if (so2 >= 76 && so2 <= 185) {
        container.style.backgroundColor = "#FEF4EA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #FF9734";
    } else if (so2 >= 186 && so2 <= 304) {
        container.style.backgroundColor = "#FAE5EA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #CA0034";
    } else if (so2 >= 305 && so2 <= 604) {
        container.style.backgroundColor = "#F0E5F5";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #670099";
    } else if (so2 >= 605 && so2 <= 804) {
        container.style.backgroundColor = "#F1E5E9";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #7E0123";
    } else {
        container.style.backgroundColor = "white";
    }
}

function backgroundColorNO2(no2){
    let container = document.getElementById("NO2_box");
    if (no2 >= 0 && no2 <= 53) {
        container.style.backgroundColor = "#E5F4EF";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #009865";
    } else if (no2 >= 54 && no2 <= 100) {
        container.style.backgroundColor = "#FFFFEA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #FFFB26";
    } else if (no2 >= 101 && no2 <= 360) {
        container.style.backgroundColor = "#FEF4EA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #FF9734";
    } else if (no2 >= 361 && no2 <= 649) {
        container.style.backgroundColor = "#FAE5EA";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #CA0034";
    } else if (no2 >= 650 && no2 <= 1249) {
        container.style.backgroundColor = "#F0E5F5";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #670099";
    } else if (no2 >= 1250 && no2 <= 1649) {
        container.style.backgroundColor = "#F1E5E9";
        container.style.border = "none";
        container.style.borderLeft = "0.5rem solid #7E0123";
    } else {
        container.style.backgroundColor = "white";
    }
}



searchData();