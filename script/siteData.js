let ApiUrlHour = "https://data.moenv.gov.tw/api/v2/aqx_p_432?api_key=57333135-175b-4b40-9866-c37d9a68215b";
let ApiUrlHalfDay = "https://data.moenv.gov.tw/api/v2/aqx_p_488?api_key=57333135-175b-4b40-9866-c37d9a68215b"

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
            // document.getElementById("pollutant").textContent = airData["pollutant"];
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
            backgroundColor();
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
                        return;
                    }
                    backgroundColor();
                }
            });
        });
}


function backgroundColor(){
    let aqiValue = document.getElementById("result_aqi").textContent;
    aqiValue = parseInt(aqiValue);
    let container = document.querySelector(".site__index-aqi-container");
    
    if (aqiValue >= 0 && aqiValue <= 50) {
        container.style.backgroundColor = "#E5F4EF";
    } else if (aqiValue >= 51 && aqiValue <= 100) {
        container.style.backgroundColor = "#FFFFEA";
    } else if (aqiValue >= 101 && aqiValue <= 150) {
        container.style.backgroundColor = "#FEF4EA";
    } else if (aqiValue >= 151 && aqiValue <= 200) {
        container.style.backgroundColor = "#FAE5EA";
    } else if (aqiValue >= 201 && aqiValue <= 300) {
        container.style.backgroundColor = "#F0E5F5";
    } else if (aqiValue >= 301 && aqiValue <= 500) {
        container.style.backgroundColor = "#F1E5E9";
    } else {
        container.style.backgroundColor = "white";
    }
}

searchData();