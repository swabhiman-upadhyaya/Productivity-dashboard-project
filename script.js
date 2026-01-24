// ALL-ELEMS SELECTOR.......
let elems = document.querySelectorAll(".elem")
let fullElem = document.querySelectorAll(".fullElem")
let closeBtn = document.querySelectorAll(".backBtn")
let allElems = document.querySelector(".allElems")

// TO-DO SELECTOR.......
let taskInput = document.querySelector(".AddTask #taskInput");
let taskDetailsInput = document.querySelector(".AddTask form #details");
let taskCheckBox = document.querySelector(".AddTask form #check");
let allTask = document.querySelector('.todo-container .allTask')

// DAILY-PLANNER SELECTOR.......
let dailyPlannerContainer = document.querySelector(".dailyPlanner-container");

let motivationalQuote = document.querySelector(".motivational-page-wrapper p")
let motivationalQuoteAuthor = document.querySelector(".motivational-page-wrapper h3")

// POMODORO TIMER SELECTOR.......
let h1Timer = document.querySelector(".times-wrapper .timer h1")
let startbtn = document.querySelector(".times-wrapper .timer-buttons .start")
let pausebtn = document.querySelector(".times-wrapper .timer-buttons .pause")
let resetbtn = document.querySelector(".times-wrapper .timer-buttons .reset")


// WEATHER & TIMER DASHBOARD SELECTOR.......
let weatherDashboard = document.querySelector(".weather-fetching-dashboard")

let dates = document.querySelector(".left .dates")
let daysTimes = document.querySelector(".left .daysTimes")
let place = document.querySelector(".left .Place")

let temperature = document.querySelector(".right h3")
let probability = document.querySelector(".right .probability")
let precipitation = document.querySelector(".right .precipitation")
let humidity = document.querySelector(".right .humidity")
let wind = document.querySelector(".right .wind")


function openFeatures() {
    elems.forEach(function (eachElem) {

        eachElem.addEventListener("click", function () {
            fullElem[eachElem.id].style.display = "block";
            allElems.style.display = "none";
            weatherDashboard.style.display = "none"
        })
    })

    closeBtn.forEach(function (eachBtn) {

        eachBtn.addEventListener("click", () => {
            fullElem[eachBtn.id].style.display = "none";
            allElems.style.display = "flex";
            weatherDashboard.style.display = "block"
        })
    })
}
openFeatures();

// =============================
// To-do List Functionality.....
// =============================

let currentTask = []
if (localStorage.getItem('currentTask')) {
    currentTask = JSON.parse(localStorage.getItem('currentTask'))
} else {
    console.log("THERE IS NO TASKS AVAILABLE!")
}
// let currentTask = JSON.parse(localStorage.getItem("currentTask")) || []


// ================================================================================================================================
// At first if we want add our TASK then we should RENDER our TASK, so renderTask() will be called and then our task will be added 
// ================================================================================================================================
function renderTask() {
    sum = ""
    currentTask.forEach(function (elem, idx) {
        sum = sum +
            `
            <div class="eachTask">
                <h3>${elem.task}</h3>
                <span class='${elem.isImportant}'>Imp</span>
                <button class='mark-as-comp' id=${idx}>Mark as Complete</button>
            </div>
            `
    })
    allTask.innerHTML = `<h3>Your Task Lists</h3>` + sum;


    let markAsCompBtns = document.querySelectorAll('.allTask button')
    markAsCompBtns.forEach(function (elem) {
        elem.addEventListener("click", function () {
            currentTask.splice(elem.id, 1)
            localStorage.setItem("currentTask", JSON.stringify(currentTask))
            renderTask()
        })
    })

}
renderTask();


// ============================================================================================================================================
/* When we submit the form then we want our TASK to be added adn display in the task list so sumbitHandeler will be called and then inside task 
our task will be added to the "currentTask" series */
// =============================================================================================================================================
let sumbitHandeler = (event) => {
    event.preventDefault();
    // let form = document.querySelector(".AddTask form");
    // form.addEventListener("submit", function (event) {
    //     event.preventDefault();
    // })


    currentTask.push(
        {
            task: taskInput.value,
            details: taskDetailsInput.value,
            isImportant: taskCheckBox.checked
        }
    )
    localStorage.setItem("currentTask", JSON.stringify(currentTask))


    // After submitting the form the input fields will be empty again.......
    taskInput.value = "";
    taskDetailsInput.value = "";
    taskCheckBox.checked = false;

    /* After addition of task if we won't call "renderTask()" again then the task will not be displayed in the task list as......
     "renderTask()" will not loaded so our entered task will not be added to the ["sum"] */

    renderTask()
}


// =============================================================
// DAILY-PLANNER PAGE...........
// =============================================================
function DailyPlanner() {
    dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {}

    let hours = Array.from({ length: 18 }, (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`)
    let wholeDaySum = '';
    hours.forEach(function (elem, idx) {

        let savedData = dayPlanData[idx] || '                      ';

        wholeDaySum = wholeDaySum +
            `<div class="dailyPlanner-features">
                    <p>${elem}</p>
                    <input type="text" name="" id=${idx} placeholder="One click and daily-routine set" value=${savedData}>
                </div>`
    })
    dailyPlannerContainer.innerHTML = wholeDaySum



    // DAILY-PLANNER INPUT SELECTOR.......

    let dailyPlannerInput = document.querySelectorAll(".dailyPlanner-features input")


    dailyPlannerInput.forEach(function (elem) {
        elem.addEventListener("input", function () {
            dayPlanData[elem.id] = elem.value;

            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })
}
DailyPlanner();

async function fetchingQuotes() {
    let response = await fetch("https://api.allorigins.win/raw?url=https://zenquotes.io/api/random")
    let data = await response.json();

    motivationalQuote.textContent = data[0].q
    motivationalQuoteAuthor.textContent = data[0].a
}
fetchingQuotes()


function stopWatch() {
    let startTime = 0;
    let elapsedTime = 0;
    let timerId = null;
    let isRunning = false;

    function formatTime(time) {
        let sec = Math.floor(time / 1000) % 60;
        let min = Math.floor(time / 60000) % 60;
        let hr = Math.floor(time / 3600000);

        return `${hr.toString().padStart(2, "0")}:` +
            `${min.toString().padStart(2, "0")}:` +
            `${sec.toString().padStart(2, "0")}`;
    }

    startbtn.addEventListener("click", () => {
        if (isRunning) return;

        isRunning = true;
        startTime = Date.now() - elapsedTime;

        timerId = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            h1Timer.textContent = formatTime(elapsedTime);
        }, 1000);
    });

    pausebtn.addEventListener("click", () => {
        if (!isRunning) return;

        isRunning = false;
        clearInterval(timerId);
    });

    resetbtn.addEventListener("click", () => {
        isRunning = false;
        clearInterval(timerId);
        elapsedTime = 0;
        h1Timer.textContent = "00:00:00";
    });
}
stopWatch()

function dailyGoals() {
    const goalInput = document.getElementById("goalInput");
    const addGoalBtn = document.getElementById("addGoalBtn");
    const goalsList = document.querySelector(".goals-list");

    let goals = JSON.parse(localStorage.getItem("dailyGoals")) || [];

    function renderGoals() {
        goalsList.innerHTML = "";

        goals.forEach((goal, index) => {
            const li = document.createElement("li");

            const text = document.createElement("span");
            text.textContent = goal;

            const btn = document.createElement("button");
            btn.textContent = "✕";
            btn.addEventListener("click", () => {
                goals.splice(index, 1);
                renderGoals();
            });

            li.append(text, btn);
            goalsList.appendChild(li);
        });

        localStorage.setItem("dailyGoals", JSON.stringify(goals));
    }

    addGoalBtn.addEventListener("click", () => {
        if (!goalInput.value.trim()) return;

        goals.push(goalInput.value.trim());
        goalInput.value = "";
        renderGoals();
    });

    renderGoals();

}
dailyGoals();


function getTime() {

    let allDaysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let allMonthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "Semptember", "October", "November", "December"]

    let date = new Date()

    let today = date.getDay()
    let todayDate = date.getDate()
    let thisMonth = date.getMonth()
    let thisYear = date.getFullYear()

    let hours = date.getHours()

    let minutes = date.getMinutes()
    minutes = String(minutes).padStart(2, "0")

    let seconds = date.getSeconds()
    seconds = String(seconds).padStart(2, "0")

    dates.innerHTML = `${todayDate}th ${allMonthsArr[thisMonth]}, ${thisYear}`

    if (hours > 12) {
        hours = hours - 12;
        hours = String(hours).padStart(2, "0")
        daysTimes.innerHTML = `${allDaysArr[today]}, ${hours}:${minutes}:${seconds}`
    }
    else {
        hours = String(hours).padStart(2, "0")
        daysTimes.innerHTML = `${allDaysArr[today]}, ${hours}:${minutes}:${seconds}`
    }
}
let updateSeconds = setInterval(function () {
    getTime();
}, 1000)


let apiKey = "5bc62630e88241d29b195239262301"
let city = "Bhubaneswar"

async function FetchingWeather() {
    response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    data = await response.json()

    temperature.innerHTML = `${data.current.temp_c}°C`
    probability.innerHTML = `Weather type: ${data.current.condition.text}`
    precipitation.innerHTML = `Dew Ammout: ${data.current.dewpoint_c}°C`
    humidity.innerHTML = `Humidity: ${data.current.humidity}`
    wind.innerHTML = `Wind: ${data.current.wind_kph}km/hr`

}
FetchingWeather();





let theme = document.querySelector("nav .theme");
let rootElement = document.documentElement
let flag = 0

theme.addEventListener("click", function () {

    if (flag == 0) {
        rootElement.style.setProperty("--primary", "#850E35")
        rootElement.style.setProperty("--secondary", "#EE6983")
        rootElement.style.setProperty("--tertiary1", "#FFC4C4")
        rootElement.style.setProperty("--tertiary2", "#FCF5EE")
        rootElement.style.setProperty("--textColor", "#ff689a")
        flag = 1
    }

    else if (flag == 1) {
        rootElement.style.setProperty("--primary", "#30364F")
        rootElement.style.setProperty("--secondary", "#ACBAC4")
        rootElement.style.setProperty("--tertiary1", "#E1D9BC")
        rootElement.style.setProperty("--tertiary2", "#F0F0DB")
        rootElement.style.setProperty("--textColor", "#becfdb")
        flag = 2
    }

    else if (flag == 2) {
        rootElement.style.setProperty("--primary", "#213C51")
        rootElement.style.setProperty("--secondary", "#DDAED3")
        rootElement.style.setProperty("--tertiary1", "#6594B1")
        rootElement.style.setProperty("--tertiary2", "#EEEEEE")
        rootElement.style.setProperty("--textColor", "#b6cddd")
        flag = 3
    }

    else if (flag == 3) {
        rootElement.style.setProperty("--primary", "#0C2C55")
        rootElement.style.setProperty("--secondary", "#296374")
        rootElement.style.setProperty("--tertiary1", "#629FAD")
        rootElement.style.setProperty("--tertiary2", "#EDEDCE")
        rootElement.style.setProperty("--textColor", "#b6cddd")
        flag = 4
    }

    else if (flag == 4) {
        rootElement.style.setProperty("--primary", "#0F2854")
        rootElement.style.setProperty("--secondary", "#1C4D8D")
        rootElement.style.setProperty("--tertiary1", "#4988C4")
        rootElement.style.setProperty("--tertiary2", "#BDE8F5")
        rootElement.style.setProperty("--textColor", "#396aa9")
        flag = 5
    }

    else if (flag == 5) {
        rootElement.style.setProperty("--primary", "#850E35")
        rootElement.style.setProperty("--secondary", "#EE6983")
        rootElement.style.setProperty("--tertiary1", "#FFC4C4")
        rootElement.style.setProperty("--tertiary2", "#FCF5EE")
        rootElement.style.setProperty("--textColor", "#ff689a")
        flag = 1
    }

})