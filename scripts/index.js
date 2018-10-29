// // =============================================
// // Defines HTML elements
// // =============================================
let fitDisplay = document.querySelector("[data-displayInfo]");
let profileHeader = document.querySelector("[data-profileHeader]");
let fatIcon = document.querySelector("[data-fat]")
let slouchIcon = document.querySelector("[data-slouch]")
let standingIcon = document.querySelector("[data-standing]")
let runningIcon = document.querySelector("[data-running]")
let liftingIcon = document.querySelector("[data-lifting]")
let allIcons= document.querySelector("[data-achievmentImages]")
let slider= document.querySelector("[data-slider]")
let sliderDisplay= document.querySelector("[data-sliderDisplay]")
let dropdownDisplay= document.querySelector("[data-dropdown")
let topContainer = document.getElementsByClassName("topcontainer")[0]
let dateSlider = document.getElementById("range-slider")
let submitButton = document.getElementById('submitButton')
const foodSelector = creatDropDown(foodDict);
const theBody = document.querySelector("body");
const theFood = document.getElementById('foodResult')
// =============================================
// add an event listener to 
// determine date range
// =============================================
const currentDate = new Date()
dateSlider.addEventListener('change', getDateRange)
foodSelector.addEventListener('change', e => {
    getFoodChoices()
    getDateRange()
})
// get user date drop down option selection
const dateDropDown = document.getElementById('dateDropDown')
let userGraphChoice = 'day'
dateDropDown.addEventListener('change', getDateRange)
// get user date from textarea
sliderDisplay.addEventListener('input', () => {
    let userDate = sliderDisplay.value.split('')
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    for (let i = 0; i < userDate.length; i++) {
        if (numbers.indexOf(userDate[i]) < 0) {
            sliderDisplay.value = dateSlider.value
            return
        }
    }
    dateSlider.value = sliderDisplay.value
    getDateRange()
})


function getDateRange() {
    sliderDisplay.value = dateSlider.value
    const parsedDate = parseDate(currentDate)
    let endDate = new Date() 
    endDate.setDate(endDate.getDate()-dateSlider.value)
    let parsedEndDate = parseDate(endDate)

    console.log(parsedDate);
    console.log(parsedEndDate);
    drawFood(parsedEndDate)
}

function parseDate(dateObject) {
    console.log(`Parsing date ${dateObject}`)
    return `${dateObject.getFullYear()}-${('0' + (dateObject.getMonth()+1)).slice(-2)}-${('0' + dateObject.getDate()).slice(-2)}`;
}

fetchProfileData();
fetchExerciseData()
// =============================================
// function that fetches profile data and 
// runs the promise chain
// =============================================
function fetchProfileData(){
    
    fetch('https://api.fitbit.com/1/user/-/profile.json',
    {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("ourtoken")}`
            
        }
    }
    )
    .then(j => {
        if (!j.ok) {
            throw new Error('network response not ok');
        }
        return j.json()
    })
    .catch(returnStubData)
    .then(getUserInfo)
    .then(writeUserInfo)
}
function getUserInfo(info){
    return ` Welcome ${info['user']["fullName"]}` 
}

function writeUserInfo(name){  
    profileDisplay = document.createElement('div');
    profileDisplay.textContent = name;
    profileHeader.appendChild(profileDisplay);
}

function returnStubData(reason) {
    console.log('Returning stub data. Request rejected because: ' + reason)
    const data =  {user: {fullName: 'Stub User'}, activityCalories: 2000,
            summary: {activityCalories: 2000, distances: [, , , {distance: 25}]}}
    console.log(data)
    return data
}

// =============================================
// function that fetches excercise data and 
// runs the promise chain
// =============================================
// only called when slider is clicked
function fetchExerciseData(){
    const date1 = parseDate(currentDate)
    const lastYear = new Date()
    lastYear.setFullYear(currentDate.getFullYear() - 1) //.setDate(currentDate.getDate())
    const date2 = parseDate(lastYear)
    fetch(`https://api.fitbit.com/1/user/-/activities/calories/date/${date2}/${date1}.json`,
    {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("ourtoken")}`

    }

}
)
.then(extractJSON)
.catch(returnStubData)
.then(extractExerciseData)
.then(achievments)
.then(requestFood)
.then(getDateRange)
}
// =============================================
// strips the data to individual componenets and
// returns the # of calories burnt as an integer
// =============================================

function extractJSON(j) {
    if (!j.ok) {
        throw new Error('network response not ok');
    }
    return j.json()
} 

function extractExerciseData(info){
    // calorie data array contains date and value for every day in range
    let caloriesDataArray = info["activities-calories"]

    console.log(info["activities-calories"])
    // let caloriesDataArray = stubCaloriesData()
    
    console.log(info)
    let totalCalories = 0
    caloriesDataArray.forEach(function(element){
        
        totalCalories += parseInt(element["value"])
    });
    
    let calorieMessage = `Total Calories: ${totalCalories}`;
    // let displayData = [calorieMessage;
    writeExerciseData(calorieMessage)
    // return stub data for testing
    // store user calorie data
    userCaloriesArray = caloriesDataArray;
    return totalCalories
}

function stubCaloriesData() {
    let newCalArray = []
    let month = new Date().getMonth() + 1
    let day = currentDate.getDate()
    let year = currentDate.getFullYear().toString().split('').splice(2, 2).join('')
    for (let i = 0; i < 365; i++) {
        let newCalEntry = {}
        // create random calories per day up to 500
        const randomCalories = Math.floor(Math.random() * 500)
        const dateString = `${month}-${day}-${year}`
        newCalEntry.dateTime = dateString
        newCalEntry.value = randomCalories
        newCalArray.push(newCalEntry)
        day--
        if (day < 0) {
            month--
            day = 30
            if (month < 0) {
                year--
                month = 12
            }
        }
    }
    return newCalArray
}
// =============================================
// helper function that writes data to the 
// document
// =============================================
function writeExerciseData(message) {
    // message.forEach(element => {
        // elementDisplay = document.createElement('div');
        fitDisplay.textContent = message;
        // fitDisplay.appendChild(elementDisplay);
        
        
    }


// takeDateRange();
// fetchExcerciseData();

function achievments(calories){
    
    // allIcons.classList.remove("currentAchievment")    
    let deleteHighlight = document.getElementsByClassName('currentAchievment')[0]
    
    if (deleteHighlight){
        deleteHighlight.classList.remove("currentAchievment");
    }
    
    if (calories <= 1000){
        fatIcon.classList.add("currentAchievment")
        
    } else if ( calories > 1000 && calories < 50000){
        slouchIcon.classList.add("currentAchievment")
        
    } else if ( calories > 50000 && calories < 100000){
        standingIcon.classList.add("currentAchievment")
        
    }else if ( calories > 100000 && calories < 200000){
        runningIcon.classList.add("currentAchievment")
        
    }else if (200000 < calories){
        liftingIcon.classList.add("currentAchievment")
        
    }
}
// =====================================================================================================================================================================================================

function creatDropDown(foodDict) {
    // create dropdown element
    let dropDown = document.createElement('select');
    // dropDown.addEventListener('change', getFoodChoices)
    dropDown.multiple = true
    dropDown.size = 9
    // add options
    for (let foodItem in foodDict) {
        let option = document.createElement("option");
        option.value = foodItem
        option.textContent =  foodDict[foodItem]['name']
        // pre-select all options
        option.selected = 'selected'
        dropDown.appendChild(option);
    }

    dropdownDisplay.appendChild(dropDown)   
    return dropDown
};

function getFoodChoices() {
    userFood = []
    const selectedOptions = foodSelector.selectedOptions
    // take selected indexes and add corresponding foodDict to userFood
    for (let index of selectedOptions) {
        let foodOption = index.value
        userFood.push(foodDict[foodOption])
        console.log('Selecting ' + foodOption)
    }
}
// run as soon as page loads
getFoodChoices(foodSelector)

// Draw new food results display
function drawFoodImages(foodObj, date){
    // receives array of foodobj
    console.log('Serving image received')
    console.log(foodObj)
    // create new div
    const foodDataDiv = document.createElement('div')
    foodDataDiv.classList.add('foodDataDiv')
    const foodImgDiv = document.createElement('div')
    foodImgDiv.classList.add('foodImageDiv')
    const dateLabel = document.createElement('h6')
    dateLabel.classList.add('foodDate')
    dateLabel.textContent = date
    foodDataDiv.appendChild(dateLabel)
    for (let i = 0; i < foodObj.length; i ++) {
        foodImgDiv.appendChild(addFoodImage(foodObj[i].src))
    }
    foodDataDiv.appendChild(foodImgDiv)
    theFood.appendChild(foodDataDiv)
    console.log('Food served.')
}
// creates food icon
function addFoodImage(foodImageSrc) {
    // creates new images element
    const newImg = document.createElement("img");
    // adds the pizza icon
    newImg.src = foodImageSrc;
    newImg.classList.add('foodImage')
    // newImg.display = block;
    return newImg
};







