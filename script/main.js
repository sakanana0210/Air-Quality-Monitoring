//For testing
// const result = document.getElementsByClassName("index__result");
// Array.from(result).forEach((indexText)=>{
//     indexText.innerHTML = 35
// })
// document.getElementById("aqi_description").innerText = "普通"
// document.getElementById("aqc_time").innerText = "2023/10/16 17:00"
// document.getElementById("legend_name").innerHTML = "NO<sub>2</sub>"
///////////////////////////////////////////////////
const mapLink = document.getElementById("map_link")
const siteLink = document.getElementById("site_link")
const aqcGraphLink = document.getElementById("aqc_graph_link")
const headerTitle = document.getElementById("header_title")
const mapSideLink = document.getElementById("map_side_link")
const siteSideLink = document.getElementById("site_side_link")
const aqcGraphSideLink = document.getElementById("aqc_graph_side_link")

const scrollToTarget = (targetIdName) => {
    const target = document.getElementById(targetIdName)
    const headerHeight = document.getElementById("header").offsetHeight;
    const targetPosition = target.offsetTop - headerHeight;
    window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
    })
}
const headerMenu = document.getElementById("header_menu")
const sideNavClose = document.getElementById("sidenav_close")
const sideNav = document.getElementById("header_sidenav")

const closeSideNav = () => {
    sideNav.style.display = "none"
    headerMenu.style.display = "block"
}

const showSideNav = () => {
    sideNav.style.display = "flex"
    headerMenu.style.display = "none"
}

headerMenu.addEventListener("click",()=>{
    showSideNav()
})

sideNavClose.addEventListener("click",()=>{
    closeSideNav()
})

mapLink.addEventListener("click",()=>{
    scrollToTarget("first_divider")
})

siteLink.addEventListener("click",()=>{
    scrollToTarget("second_divider")
})

aqcGraphLink.addEventListener("click",()=>{
    scrollToTarget("third_divider")
})

headerTitle.addEventListener("click",()=>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

mapSideLink.addEventListener("click",()=>{
    scrollToTarget("first_divider")
})

siteSideLink.addEventListener("click",()=>{
    scrollToTarget("second_divider")
})

aqcGraphSideLink.addEventListener("click",()=>{
    scrollToTarget("third_divider")
})

