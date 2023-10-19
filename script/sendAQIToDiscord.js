//discord webhook sending message to wehelp #bot channel
const webhookEndPoint = 'https://discord.com/api/webhooks/1162404320399085690/y6pNTIyURc4-ftZIicqF49uzwNTF70bRw_9D1QyVrmxzbwagnXXX-HNW2E6QvzUJVUVS'

let time = ""
let siteName = document.getElementById("site_name").innerText;
let areaName = ""
const apiKey = "1fc8a126-ee45-4101-a168-12f15eecfb95"
const dataLimit = 85

let aqi, aqiStatus, pm2dot5_avg, pm10_avg, o3_8hr, co_8hr, so2, no2
let statusAirImgUrl, statusColor
let aqiState
let greenAirImgUrl = "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070"
let yellowAirImgUrl = "https://images.unsplash.com/photo-1529552650426-8e2c6ca5824c?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1932"
let orangeAirImgUrl = "https://images.unsplash.com/photo-1532300481631-0bc14f3b7699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
let redAirImgUrl = "https://images.unsplash.com/photo-1580207868427-f019836acf26?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNpdHklMjB3aXRoJTIwc21vZ3xlbnwwfHwwfHx8MA%3D%3D&w=500"
let purpleAirImgUrl = "https://plus.unsplash.com/premium_photo-1664298311043-46b3814a511f?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2l0eSUyMHdpdGglMjBzbW9nfGVufDB8fDB8fHww&w=500"
let brownAirImgUrl = "https://images.unsplash.com/photo-1470217957101-da7150b9b681?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNpdHklMjB3aXRoJTIwYWlyJTIwcG9sbHV0ZXxlbnwwfHwwfHx8MA%3D%3D&w=500"

const discordBtn = document.getElementById("discord_button")

discordBtn.addEventListener("click",()=>{
    siteName = document.getElementById("site_name").innerText
    let message = `確定發送"${siteName}偵測站"當前監測數值至Discord嗎?`
    let result = confirm(message)
    if(result==true){
        sendMessage()
    }else{
        return
    }
})

const currentData = async () => {
    try{
        let url = `https://data.moenv.gov.tw/api/v2/aqx_p_488?api_key=${apiKey}&limit=${dataLimit}&sort=datacreationdate%20desc&format=JSON`
        let data = await fetch(url)
        let parsedData = await data.json()
        return parsedData["records"]
    }catch(e){
        return false
    }
}

const getSiteCurrentData = async () => {
    let data = await currentData()
    let result = data.filter((site)=>{
        return site["sitename"] == siteName
    })
    return result[0]
}

const regularAdvice = {
    "good":"正常戶外活動。",
    "moderate":"正常戶外活動。",
    "unhealthyForSensitive":"1.一般民眾如果有不適，如眼痛，咳嗽或喉嚨痛等，應該考慮減少戶外活動。\n2.學生仍可進行戶外活動，但建議減少長時間劇烈運動。",
    "unhealthy":"1.一般民眾如果有不適，如眼痛，咳嗽或喉嚨痛等，應減少體力消耗，特別是減少戶外活動。\n2.學生應避免長時間劇烈運動，進行其他戶外活動時應增加休息時間。",
    "veryUnhealthy":"1.一般民眾應減少戶外活動。\n2.學生應立即停止戶外活動，並將課程調整於室內進行。",
    "hazardous":"1.一般民眾應避免戶外活動，室內應緊閉門窗，必要外出應配戴口罩等防護用具。\n2.學生應立即停止戶外活動，並將課程調整於室內進行。"
}

const sensitiveAdvice = {
    "good":"正常戶外活動",
    "moderate":"極特殊敏感族群建議注意可能產生的咳嗽或呼吸急促症狀，但仍可正常戶外活動。",
    "unhealthyForSensitive":"1.有心臟、呼吸道及心血管疾病患者、孩童及老年人，建議減少體力消耗活動及戶外活動，必要外出應配戴口罩。\n2.具有氣喘的人可能需增加使用吸入劑的頻率。",
    "unhealthy":"1.有心臟、呼吸道及心血管疾病患者、孩童及老年人，建議留在室內並減少體力消耗活動，必要外出應配戴口罩。\n2.具有氣喘的人可能需增加使用吸入劑的頻率。",
    "veryUnhealthy":"1.有心臟、呼吸道及心血管疾病患者、孩童及老年人應留在室內並減少體力消耗活動，必要外出應配戴口罩。\n2.具有氣喘的人應增加使用吸入劑的頻率。",
    "hazardous":"1.有心臟、呼吸道及心血管疾病患者、孩童及老年人應留在室內並避免體力消耗活動，必要外出應配戴口罩。\n2.具有氣喘的人應增加使用吸入劑的頻率。"
}

const setData = async () => {
    let data = await getSiteCurrentData()
    aqi = data["aqi"]
    aqiStatus = data["status"]
    pm2dot5_avg = data["pm2.5_avg"]
    pm10_avg = data["pm10_avg"]
    o3_8hr = data["o3_8hr"]
    co_8hr = data["co_8hr"]
    so2 = data["so2"]
    no2 = data["no2"]
    time = data["datacreationdate"]
    areaName = data["sitename"]
    statusAirImgUrl = (aqi>0 && aqi<=50) ? greenAirImgUrl
                    :(aqi>50 && aqi<=100) ? yellowAirImgUrl
                    :(aqi>100 && aqi<=150) ? orangeAirImgUrl
                    :(aqi>150 && aqi<=200) ? redAirImgUrl
                    :(aqi>200 && aqi<=300) ? purpleAirImgUrl
                    : brownAirImgUrl;
    statusColor = (aqi>0 && aqi<=50) ? 39013
                    :(aqi>50 && aqi<=100) ? 16775974
                    :(aqi>100 && aqi<=150) ? 16750388
                    :(aqi>150 && aqi<=200) ? 13238324
                    :(aqi>200 && aqi<=300) ? 6750361
                    : 8257827;
    aqiState = (aqi>0 && aqi<=50) ? "good"
                    :(aqi>50 && aqi<=100) ? "moderate"
                    :(aqi>100 && aqi<=150) ? "unhealthyForSensitive"
                    :(aqi>150 && aqi<=200) ? "unhealthy"
                    :(aqi>200 && aqi<=300) ? "veryUnhealthy"
                    : "hazardous";
}

const sendMessage = async () =>{
    await setData()
    const head = {
        "Content-type":"application/json"
    }
    const embedContent = createEmbededMessage()
    const body = {
        "username":"AQI 機器人",
        "avatar_url":"",
        "content":"即時空氣品質監測數值通知:grinning::grinning::grinning:",
        "embeds":[embedContent]
    }
    let response = await fetch(webhookEndPoint,{method:"POST", headers:head, body:JSON.stringify(body)})
}

const createEmbededMessage = () => {
    const message = {
        "author": {
            "name": "AQI 土撥鼠特派員",
            "url": "https://airtw.moenv.gov.tw/",
            "icon_url": "https://media.tenor.com/DnQjJgzO2W4AAAAd/ahhh-scream.gif"
        },
        "title": `${areaName}地區 >> 空氣品質檢測結果`,
        "url": "https://airtw.moenv.gov.tw/",
        "description": `偵測時間: ${time}`,
        "color": statusColor,
        "fields": [
            {
                "name": "空氣品質AQI",
                "value": `${aqi}-${aqiStatus}`,
            },
            {
                "name": "細懸浮微粒 PM2.5",
                "value": pm2dot5_avg,
                "inline": true
            },
            {
                "name": "懸浮微粒 PM10",
                "value": pm10_avg,
                "inline": true
            },
            {
                "name": "臭氧 O3",
                "value": o3_8hr,
                "inline": true
            },
            {
                "name": "一氧化碳 CO",
                "value": co_8hr,
                "inline": true
            },
            {
                "name": "二氧化硫 SO2",
                "value": so2,
                "inline": true
            },
            {
                "name": "二氧化氮 NO2",
                "value": no2,
                "inline": true
            },
            {
                "name": "🙂給一般民眾的活動建議",
                "value": regularAdvice[aqiState]
            },
            {
                "name": "😐給敏感性族群的活動建議",
                "value": sensitiveAdvice[aqiState]
            }
        ],
        "thumbnail": {
            "url": "https://images.squarespace-cdn.com/content/v1/5ddacf27b83e5119cdfedbb0/1660186680031-99NGCPHB8U0UFVOMYB5M/The+Curious+Marmot.JPG?format=1000w"
        },
        "image": {
            "url": statusAirImgUrl
        },
        "footer": {
            "text": "Thanks! 祝你有個愉快的一天",
            "icon_url": "https://i.pinimg.com/originals/d7/ce/7d/d7ce7de4a7157c0262cb65dd1efc47d1.png"
        }
    }
    return message
}
