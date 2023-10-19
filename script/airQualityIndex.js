let AQIModule = (function() {
    // Data Initialization
    let is42ndColor = false;
    let indexItem = "PM25";
    let currBtn = document.getElementById("aqc_option_pm2dot5");
    const currentDate = new Date();
    if(currentDate.getMinutes() < 20)
        subtractOneHour(currentDate);
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString();
    const day = currentDate.getDate().toString();
    let hours = (currentDate.getHours()).toString();
    hours = hours.length===1 ? "0"+hours : hours;
    const time = hours+"0000";
    const date = year+month+day;

    let indexMap = new Map()
    indexMap.set("aqc_option_pm2dot5", "PM25");
    indexMap.set("aqc_option_pm10", "PM10");
    indexMap.set("aqc_option_O3", "O3");
    indexMap.set("aqc_option_CO", "CO");
    indexMap.set("aqc_option_SO2", "SO2");
    indexMap.set("aqc_option_NO2", "NO2");

    window.onload = function AQIload() {
        InitializeAQIElement();
        addAQIEventListener();
    }


    // Initialize element
    // TODO :
    // Change the default button click
    // Change the graph based on the default button
    // Change the default island
    function InitializeAQIElement(){
        let aqiTime = document.getElementById("aqc_time");
        aqiTime.innerText = year+"/"+month+"/"+day+" "+ hours + ":00";

        // Legend
        changeLegend(currBtn);

        addModelSimulateImage(is42ndColor, date, time, "PM25");

        document.getElementById("matzu").style.backgroundImage = "url(" + "https://airtw.moenv.gov.tw/images/ConcentrationMap/matzu.png" + ")";
        document.getElementById("matzu").style.backgroundColor = "#969696";
        document.getElementById("kinmen").style.backgroundImage = "url(" + "https://airtw.moenv.gov.tw/images/ConcentrationMap/kinmen.png" + ")";
        document.getElementById("kinmen").style.backgroundColor = "#969696";
        document.getElementById("penghu").style.backgroundImage = "url(" + "https://airtw.moenv.gov.tw/images/ConcentrationMap/penghu.png" + ")";
        document.getElementById("penghu").style.backgroundColor = "#969696";
    }

    // Add listener
    function addAQIEventListener(){
        document.querySelector(".aqc__button").addEventListener("click", () => {
            is42ndColor = !is42ndColor;
            document.getElementById("legend_color_bar").style.background = is42ndColor == false ?
                "linear-gradient(to top,#096,#ffde33,#f93,#c03,#609,#7e0023,#2d020e)" :
                "linear-gradient(to top,#0d7bc0,#4bbffc,#6bdcd7,#f3d62b,#f3a439,#ea6026)";
            changeLegend(currBtn);
            addModelSimulateImage(is42ndColor, date, time, indexItem);
        });
    
        let buttons = document.querySelectorAll(".options__button");
        [].forEach.call(buttons, function(btn){
            btn.addEventListener("click", () => {
                currBtn = btn;
                // legend
                changeLegend(btn);
                // image
                indexItem = indexMap.get(btn.id);
                addModelSimulateImage(is42ndColor, date, time, indexItem);
            });
        });
    }

    // Utility
    function subtractOneHour(currentDate){
        currentDate.setHours(currentDate.getHours() - 1);

        if (currentDate.getHours() < 0) {
            currentDate.setDate(currentDate.getDate() - 1);
            if (currentDate.getDate() === 0) {
                currentDate.setMonth(currentDate.getMonth() - 1);
                if (currentDate.getMonth() === -1) {
                    currentDate.setFullYear(currentDate.getFullYear() - 1);
                    currentDate.setMonth(11);
                }
    
                currentDate.setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate());
            }
            currentDate.setHours(23);
        }
        return currentDate;
    }

    function addOneHour(currentDate){
        currentDate.setHours(currentDate.getHours() + 1);

        if (currentDate.getHours() > 23) {
            currentDate.setDate(currentDate.getDate() + 1);
            let lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0);
            if (currentDate.getDate() > lastDayOfMonth.getDate()) {
                currentDate.setMonth(currentDate.getMonth() + 1);
                if (currentDate.getMonth() === 12) {
                    currentDate.setFullYear(currentDate.getFullYear() + 1);
                    currentDate.setMonth(0);
                }
    
                currentDate.setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate());
            }
            currentDate.setHours(0);
        }
    }

    function changeLegend(btn){
        // Legend title
        const legend = document.getElementById("legend_name");
        legend.innerHTML = btn.innerHTML;
        // Legend mark
        if(btn.id == "aqc_option_pm2dot5"){
            document.getElementById("legend_marker_1").innerText = is42ndColor == false ? 350.4 : 142;
            document.getElementById("legend_marker_2").innerText = is42ndColor == false ? 250.4 : 118;
            document.getElementById("legend_marker_3").innerText = is42ndColor == false ? 150.4 : 94;
            document.getElementById("legend_marker_4").innerText = is42ndColor == false ? 54.4 : 71;
            document.getElementById("legend_marker_5").innerText = is42ndColor == false ? 35.4 : 47;
            document.getElementById("legend_marker_6").innerText = is42ndColor == false ? 15.4 : 23;
        }
        else if(btn.id == "aqc_option_pm10"){
            document.getElementById("legend_marker_1").innerText = is42ndColor == false ? 350.4 : 367;
            document.getElementById("legend_marker_2").innerText = is42ndColor == false ? 250.4 : 306;
            document.getElementById("legend_marker_3").innerText = is42ndColor == false ? 150.4 : 245;
            document.getElementById("legend_marker_4").innerText = is42ndColor == false ? 54.4 : 183;
            document.getElementById("legend_marker_5").innerText = is42ndColor == false ? 35.4 : 122;
            document.getElementById("legend_marker_6").innerText = is42ndColor == false ? 15.4 : 61;
        }
        else if(btn.id == "aqc_option_O3"){
            document.getElementById("legend_marker_1").innerText = is42ndColor == false ? 504 : 131;
            document.getElementById("legend_marker_2").innerText = is42ndColor == false ? 404 : 110;
            document.getElementById("legend_marker_3").innerText = is42ndColor == false ? 204 : 88;
            document.getElementById("legend_marker_4").innerText = is42ndColor == false ? 164 : 66;
            document.getElementById("legend_marker_5").innerText = is42ndColor == false ? "-" : 44;
            document.getElementById("legend_marker_6").innerText = is42ndColor == false ? "-" : 22;
        }
        else if(btn.id == "aqc_option_CO"){
            document.getElementById("legend_marker_1").innerText = is42ndColor == false ? 40.4 : 3.44;
            document.getElementById("legend_marker_2").innerText = is42ndColor == false ? 30.4 : 2.86;
            document.getElementById("legend_marker_3").innerText = is42ndColor == false ? 15.4 : 2.29;
            document.getElementById("legend_marker_4").innerText = is42ndColor == false ? 12.4 : 1.72;
            document.getElementById("legend_marker_5").innerText = is42ndColor == false ? 9.4 : 1.15;
            document.getElementById("legend_marker_6").innerText = is42ndColor == false ? 4.4 : 0.57;
        }
        else if(btn.id == "aqc_option_SO2"){
            document.getElementById("legend_marker_1").innerText = is42ndColor == false ? 804 : 45.4;
            document.getElementById("legend_marker_2").innerText = is42ndColor == false ? 604 : 37.9;
            document.getElementById("legend_marker_3").innerText = is42ndColor == false ? 304 : 30.3;
            document.getElementById("legend_marker_4").innerText = is42ndColor == false ? 185 : 22.7;
            document.getElementById("legend_marker_5").innerText = is42ndColor == false ? 75 : 15.1;
            document.getElementById("legend_marker_6").innerText = is42ndColor == false ? 20 : 7.6;
        }
        else if(btn.id == "aqc_option_NO2"){
            document.getElementById("legend_marker_1").innerText = is42ndColor == false ? 1649 : 74.5;
            document.getElementById("legend_marker_2").innerText = is42ndColor == false ? 1249 : 62.1;
            document.getElementById("legend_marker_3").innerText = is42ndColor == false ? 649 : 49.7;
            document.getElementById("legend_marker_4").innerText = is42ndColor == false ? 360 : 37.3;
            document.getElementById("legend_marker_5").innerText = is42ndColor == false ? 100 : 24.8;
            document.getElementById("legend_marker_6").innerText = is42ndColor == false ? 30 : 12.4;
        }
    }

    function addModelSimulateImage(is42ndColor, date, time, index){
        // main
        const graph = document.getElementById("tw_density");
        let url = is42ndColor ? "https://airtw.moenv.gov.tw/ModelSimulate42ndColor/" : "https://airtw.moenv.gov.tw/ModelSimulate/";
        url = url + date + "/output_" + index  + "_" + date + time + ".png";
        graph.style.backgroundImage = "";
        graph.style.backgroundImage = "url(" + url + ")";
        // island
        let indexIsland = index;
        if(index == "PM25"){
            indexIsland = "PM2.5"
        }
        addImageForIsland(indexIsland);
    }

    async function addImageForIsland(type){
        let urlMatzu = "https://data.moenv.gov.tw/api/v2/aqx_p_260?api_key=3d22cf48-e7b0-4d8b-9750-459df6d5e161"
        let urlKinmen = "https://data.moenv.gov.tw/api/v2/aqx_p_261?api_key=3d22cf48-e7b0-4d8b-9750-459df6d5e161"
        let urlPenghu = "https://data.moenv.gov.tw/api/v2/aqx_p_262?api_key=3d22cf48-e7b0-4d8b-9750-459df6d5e161"
        await fetch(urlMatzu).then(response => {return response.json();})
            .then(data => {
                for(let i=0 ; i<6 ; i++){
                    if(type == data.records[i].itemengname){
                        // console.log(data.records[i].itemengname);
                        // console.log(data.records[i].concentration);
                        // console.log(getColor(data.records[i].itemengname, data.records[i].concentration));
                        document.getElementById("matzu").style.backgroundColor = getColor(data.records[i].itemengname, data.records[i].concentration);
                    }
                }
            }).catch(error => {console.error(error);});
        await fetch(urlKinmen).then(response => {return response.json();})
            .then(data => {
                for(let i=0 ; i<6 ; i++){
                    if(type == data.records[i].itemengname){
                        document.getElementById("kinmen").style.backgroundColor = getColor(data.records[i].itemengname, data.records[i].concentration);
                    }
                }
            }).catch(error => {console.error(error);});
        await fetch(urlPenghu).then(response => {return response.json();})
            .then(data => {
                for(let i=0 ; i<6 ; i++){
                    if(type == data.records[i].itemengname){
                        document.getElementById("penghu").style.backgroundColor = getColor(data.records[i].itemengname, data.records[i].concentration);
                    }
                }
            }).catch(error => {console.error(error);});
    }

    function getColor(category, value){
        if(category == "PM2.5") return backgroundColorPm2dot5(value);
        else if(category == "PM10") return backgroundColorPm10(value);
        else if(category == "O3") return backgroundColorO3(value);
        else if(category == "CO") return backgroundColorCO(value);
        else if(category == "SO2") return backgroundColorSO2(value);
        else if(category == "NO2") return backgroundColorNO2(value);
        else {
            return "#969696";
        }
    }

    function backgroundColorPm2dot5(pm2dot5){
        if (pm2dot5 >= 0 && pm2dot5 < 15.5) {
            return is42ndColor==false ? "#009865" : "#0d7bc0";
        } else if (pm2dot5 >= 1.55 && pm2dot5 < 35.5) {
            return is42ndColor==false ? "#FFFB26" : "#4bbffc";
        } else if (pm2dot5 >= 35.5 && pm2dot5 < 54.5) {
            return is42ndColor==false ? "#FF9734" : "#6bdcd7";
        } else if (pm2dot5 >= 54.5 && pm2dot5 < 150.5) {
            return is42ndColor==false ? "#CA0034" : "#f3d62b";
        } else if (pm2dot5 >= 150.5 && pm2dot5 < 250.5) {
            return is42ndColor==false ? "#670099" : "#f3a439";
        } else if (pm2dot5 >= 250.5 && pm2dot5 < 350.4) {
            return is42ndColor==false ? "#7E0123" : "#ea6026";
        } else {
            return "#969696";
        }
    }
    
    function backgroundColorPm10(pm10){
        if (pm10 >= 0.0001 && pm10 < 55) {
            return is42ndColor==false ? "#009865" : "#0d7bc0";
        } else if (pm10 >= 55 && pm10 < 126) {
            return is42ndColor==false ? "#FFFB26" : "#4bbffc";
        } else if (pm10 >= 126 && pm10 < 255) {
            return is42ndColor==false ? "#FF9734" : "#6bdcd7";
        } else if (pm10 >= 255 && pm10 < 355) {
            return is42ndColor==false ? "#CA0034" : "#f3d62b";
        } else if (pm10 >= 355 && pm10 < 425) {
            return is42ndColor==false ? "#670099" : "#f3a439";
        } else if (pm10 >= 425 && pm10 < 504) {
            return is42ndColor==false ? "#7E0123" : "#ea6026";
        } else {
            return "#969696";
        }
    }
    
    function backgroundColorO3(o3){
        if (o3 >= 0.0001 && o3 < 55) {
            return is42ndColor==false ? "#009865" : "#0d7bc0";
        } else if (o3 >= 55 && o3 < 71) {
            return is42ndColor==false ? "#FFFB26" : "#4bbffc";
        } else if (o3 >= 71 && o3 < 86) {
            return is42ndColor==false ? "#FF9734" : "#6bdcd7";
        } else if (o3 >= 86 && o3 < 106) {
            return is42ndColor==false ? "#CA0034" : "#f3d62b";
        } else if (o3 >= 106 && o3 <= 200) {
            return is42ndColor==false ? "#670099" : "#f3a439";
        } else if (o3 >= 200) {
            return is42ndColor==false ? "#7E0123" : "#ea6026";
        } else {
            return "#969696";
        }
    }
    
    function backgroundColorCO(co){
        if (co >= 0.0001 && co < 4.5) {
            return is42ndColor==false ? "#009865" : "#0d7bc0";
        } else if (co >= 4.5 && co < 9.5) {
            return is42ndColor==false ? "#FFFB26" : "#4bbffc";
        } else if (co >= 9.5 && co < 12.5) {
            return is42ndColor==false ? "#FF9734" : "#6bdcd7";
        } else if (co >= 12.5 && co < 15.5) {
            return is42ndColor==false ? "#CA0034" : "#f3d62b";
        } else if (co >= 15.5 && co < 30.5) {
            return is42ndColor==false ? "#670099" : "#f3a439";
        } else if (co >= 30.5 && co < 40.4) {
            return is42ndColor==false ? "#7E0123" : "#ea6026";
        } else {
            return "#969696";
        }
    }
    
    function backgroundColorSO2(so2){
        let container = document.getElementById("SO_box");
        if (so2 >= 0.0001 && so2 < 36) {
            return is42ndColor==false ? "#009865" : "#0d7bc0";
        } else if (so2 >= 36 && so2 < 76) {
            return is42ndColor==false ? "#FFFB26" : "#4bbffc";
        } else if (so2 >= 76 && so2 < 186) {
            return is42ndColor==false ? "#FF9734" : "#6bdcd7";
        } else if (so2 >= 186 && so2 < 305) {
            return is42ndColor==false ? "#CA0034" : "#f3d62b";
        } else if (so2 >= 305 && so2 < 605) {
            return is42ndColor==false ? "#670099" : "#f3a439";
        } else if (so2 >= 605 && so2 < 804) {
            return is42ndColor==false ? "#7E0123" : "#ea6026";
        } else {
            return "#969696";
        }
    }
    
    function backgroundColorNO2(no2){
        if (no2 >= 0.0001 && no2 < 54) {
            return is42ndColor==false ? "#009865" : "#0d7bc0";
        } else if (no2 >= 54 && no2 < 101) {
            return is42ndColor==false ? "#FFFB26" : "#4bbffc";
        } else if (no2 >= 101 && no2 < 361) {
            return is42ndColor==false ? "#FF9734" : "#6bdcd7";
        } else if (no2 >= 361 && no2 < 650) {
            return is42ndColor==false ? "#CA0034" : "#f3d62b";
        } else if (no2 >= 650 && no2 < 1250) {
            return is42ndColor==false ? "#670099" : "#f3a439";
        } else if (no2 >= 1250 && no2 < 1649) {
            return is42ndColor==false ? "#7E0123" : "#ea6026";
        } else  {
            return "#969696";
        }
    }
})();