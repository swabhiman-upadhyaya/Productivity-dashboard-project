let elems = document.querySelectorAll(".elem")
let fullElem = document.querySelectorAll(".fullElem")
let closeBtn = document.querySelectorAll(".backBtn")

elems.forEach(function(eachElem) {
    
    eachElem.addEventListener("click", function() {
        fullElem[eachElem.id].style.display = "block";
    })
})

closeBtn.forEach(function(eachBtn) {
    
    eachBtn.addEventListener("click", () => {
        fullElem[eachBtn.id].style.display = "none"
    })
})

// To-do List Functionality