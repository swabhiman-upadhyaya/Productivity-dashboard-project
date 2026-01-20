

let taskInput = document.querySelector(".AddTask #taskInput");
let taskDetailsInput = document.querySelector(".AddTask form #details");
let taskCheckBox = document.querySelector(".AddTask form #check");

let allTask = document.querySelector('.todo-container .allTask')

let elems = document.querySelectorAll(".elem")
let fullElem = document.querySelectorAll(".fullElem")
let closeBtn = document.querySelectorAll(".backBtn")
let allElems = document.querySelector(".allElems")

function openFeatures() {
    elems.forEach(function (eachElem) {

        eachElem.addEventListener("click", function () {
            fullElem[eachElem.id].style.display = "block";
            allElems.style.display = "none";
        })
    })

    closeBtn.forEach(function (eachBtn) {

        eachBtn.addEventListener("click", () => {
            fullElem[eachBtn.id].style.display = "none";
            allElems.style.display = "flex";
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

// ------------------------------------------------------------------------------------------------


