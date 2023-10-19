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
        let dValue = 99;
        let colors = is42ndColor == false ?
            ["#009966","#ffde33","#ff9933","#cc0033","#660099","#7e0023","#2d020e"] :
            ["#0d7bc0","#4bbffc","#6bdcd7","#f3d62b","#f3a439","#ea6026"];
        for(let i=0 ; i<colors.length ; i++){
            colors[i] = hexToRgb(colors[i]);
        }
        if(category == "PM2.5") dValue = backgroundColorPm2dot5(value);
        else if(category == "PM10") dValue = backgroundColorPm10(value);
        else if(category == "O3") dValue = backgroundColorO3(value);
        else if(category == "CO") dValue = backgroundColorCO(value);
        else if(category == "SO2") dValue = backgroundColorSO2(value);
        else if(category == "NO2") dValue = backgroundColorNO2(value);
        else {
            return "#969696";
        }
        let startColor = colors[0];
        let endColor = colors[0];
        for(let i=0 ; i<colors.length ; i++){
            if(i/colors.length*100 > dValue){
                endColor = colors[i];
                break;
            }
            startColor = colors[i];
        }
        const rgbStart = startColor.match(/\d+/g); // 从起始色中提取RGB值
        const rgbEnd = endColor.match(/\d+/g);
        // return "rgb(" + Pic_R[dValue] + "," + Pic_G[dValue] + "," + Pic_B[dValue] + ")";
        return `rgb(${Math.round((dValue/100) * rgbStart[0] + (1 - dValue/100) * rgbEnd[0])}, 
                    ${Math.round((dValue/100) * rgbStart[1] + (1 - dValue/100) * rgbEnd[1])}, 
                    ${Math.round((dValue/100) * rgbStart[2] + (1 - dValue/100) * rgbEnd[2])})`;
    }

    function hexToRgb(hex) {
        hex = hex.replace("#", "");
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
    
    function backgroundColorPm2dot5(pm2dot5){
        return (pm2dot5/(350.4-0)*100);
        // return Math.round(pm2dot5/100*60);
    }

    function backgroundColorPm10(pm10){
        return (pm10/(504-0)*100);
        // return Math.round(pm10/100*60);
    }

    function backgroundColorO3(o3){
        return (o3/(504-0)*100);
        // return Math.round(o3/100*60);
    }

    function backgroundColorCO(co){
        return (co/(40.4-0)*100);
        // return Math.round(co/100*60);
    }

    function backgroundColorSO2(so2){
        return (so2/(804-0)*100);
        // return Math.round(so2/100*60);
    }

    function backgroundColorNO2(no2){
        return (no2/(1649-0)*100);
        // return Math.round(no2/100*60);
    }
})();