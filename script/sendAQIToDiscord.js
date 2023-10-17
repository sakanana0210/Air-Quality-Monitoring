//discord webhook sending message to wehelp #bot channel
const webhookEndPoint = 'https://discord.com/api/webhooks/1162404320399085690/y6pNTIyURc4-ftZIicqF49uzwNTF70bRw_9D1QyVrmxzbwagnXXX-HNW2E6QvzUJVUVS'

let time = ""
let siteName = document.getElementById("site_name").innerText;
let areaName = ""
const apiKey = "1fc8a126-ee45-4101-a168-12f15eecfb95"
const dataLimit = 85

let aqi
let aqiStatus
let pm2dot5_avg
let pm10_avg
let o3_8hr
let co_8hr
let so2
let no2
let statusAirImgUrl
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
                    : brownAirImgUrl
}

const sendMessage = async () =>{
    await setData()
    const head = {
        "Content-type":"application/json"
    }
    const embedContent = createEmbededMessage()
    const body = {
        "username":"AQI Notify Robot",
        "avatar_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Marmot-edit1.jpg/1200px-Marmot-edit1.jpg",
        "content":`${time}，${areaName}地區的空氣品質狀況如下`,
        "embeds":[embedContent]
    }
    let response = await fetch(webhookEndPoint,{method:"POST", headers:head, body:JSON.stringify(body)})
}



const createEmbededMessage = () => {
    const message = {
        "author": {
            "name": "AQI Marmot",
            "url": "https://airtw.moenv.gov.tw/",
            "icon_url": "https://media.tenor.com/DnQjJgzO2W4AAAAd/ahhh-scream.gif"
        },
        "title": "空氣品質檢測結果",
        "url": "https://airtw.moenv.gov.tw/",
        "description": "即時空氣品質監測數值通知 :grinning: :grinning: :grinning:",
        "color": 1488080,
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
                "name": "Thanks!",
                "value": "祝你有個愉快的一天 :wink:"
            }
        ],
        "thumbnail": {
            "url": "https://images.squarespace-cdn.com/content/v1/5ddacf27b83e5119cdfedbb0/1660186680031-99NGCPHB8U0UFVOMYB5M/The+Curious+Marmot.JPG?format=1000w"
        },
        "image": {
            "url": statusAirImgUrl
        },
        "footer": {
            "text": "Have a nice day and well prepared for the air quality outside!",
            "icon_url": "https://i.pinimg.com/originals/d7/ce/7d/d7ce7de4a7157c0262cb65dd1efc47d1.png"
        }
    }
    return message
}
