let AQIModule = (function() {
    // Data Initialization
    let is42ndColor = false;
    let indexItem = "PM25";
    const currentDate = new Date();
    checkDate(currentDate);
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString();// 月份从0开始，所以要加1
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
    }

    // Add listener
    function addAQIEventListener(){
        document.querySelector(".aqc__button").addEventListener("click", () => {
            is42ndColor = !is42ndColor;
            addModelSimulateImage(is42ndColor, date, time, indexItem);
        });
    
        let buttons = document.querySelectorAll(".options__button");
        [].forEach.call(buttons, function(btn){
            btn.addEventListener("click", () => {
                // legend
                const legend = document.getElementById("legend_name");
                legend.innerHTML = btn.innerHTML;
                // image
                indexItem = indexMap.get(btn.id);
                addModelSimulateImage(is42ndColor, date, time, indexItem);
            });
        });
    }

    // Utility
    function checkDate(currentDate){
        if(currentDate.getMinutes() > 10) return;
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
    }

    function addModelSimulateImage(is42ndColor, date, time, index){
        // TODO:
        // island
        const graph = document.getElementById("tw_density");
        let url = is42ndColor ? "https://airtw.moenv.gov.tw/ModelSimulate42ndColor/" : "https://airtw.moenv.gov.tw/ModelSimulate/";
        url = url + date + "/output_" + index  + "_" + date + time + ".png";
        graph.style.backgroundImage = "";
        graph.style.backgroundImage = "url(" + url + ")";
    }
})();