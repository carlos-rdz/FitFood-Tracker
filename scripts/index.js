// // =============================================
// // Defines HTML elements
// // 
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
// =============================================
// add an event listener to 
// determine date range
// =============================================

dateSlider.addEventListener("click", e => 
    sliderDisplay.textContent = e.target.value)

submitButton.addEventListener('click', () => {
    console.log('Submit button clicked.')
    
    getFoodChoices(foodSelector)
    getDateRange(dateSlider)
})

function getDateRange(dateSlider) {
    let todaysDate = new Date()
    let parsedDate = `${todaysDate.getFullYear()}-${('0' + (todaysDate.getMonth()+1)).slice(-2)}-${('0' + todaysDate.getDate()).slice(-2)}`;
    

    // check this
    let endDate = new Date()
    endDate.setDate(endDate.getDate()-dateSlider.value)

    let parsedEndDate = `${endDate.getFullYear()}-${('0' + (endDate.getMonth()+1)).slice(-2)}-${('0' + endDate.getDate()).slice(-2)}`;


    console.log(parsedDate);
    console.log(parsedEndDate);

    // let activities = ['activityCalories','distance']

    // fetchExcerciseData(activities[0],parsedEndDate,parsedDate);
    fetchExerciseData(parsedEndDate,parsedDate);
    
}

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
function fetchExerciseData(date1,date2){
    
    fetch(`https://api.fitbit.com/1/user/-/activities/tracker/activityCalories/date/${date2}/${date1}.json`,
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
    let calorieDataArray = [
        {date: '10-31-18', value: 290},
        {date: '10-30-18', value: 350},
        {date: '10-29-18', value: 100}
    ]
    console.log(info["activities-tracker-activityCalories"])
    let totalCalories = 0
    calorieDataArray.forEach(function(element){

        totalCalories += parseInt(element["value"])
    });
    
    let calorieMessage = `Total Calories: ${totalCalories}`;
    let displayData = [calorieMessage];
    writeExerciseData(displayData)
    // return stub data for testing
    return calorieDataArray
}
// =============================================
// helper function that writes data to the 
// document
// =============================================
function writeExerciseData(message) {
    message.forEach(element => {
        // elementDisplay = document.createElement('div');
        sliderDisplay.textContent = element;
        // fitDisplay.appendChild(elementDisplay);

   
    })
}

fetchProfileData();
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
        
    } else if ( 1000 < calories < 50000){
        slouchIcon.classList.add("currentAchievment")
        
    } else if ( 50000 < calories < 100000){
        standingIcon.classList.add("currentAchievment")
        
    }else if ( 100000 < calories < 200000){
        runningIcon.classList.add("currentAchievment")
        
    }else if (200000 < calories < 500000){
        liftingIcon.classList.add("currentAchievment")
        
    }
    return calories
}
// =====================================================================================================================================================================================================

function creatDropDown(foodDict) {
    // create dropdown element
    let dropDown = document.createElement('select');
    // dropDown.addEventListener('change', getFoodChoices)
    dropDown.multiple = true
    dropDown.size = 5
    // add options
    for (let foodItem in foodDict) {
        let option = document.createElement("option");
        option.value = foodItem
        option.textContent =  foodDict[foodItem]['name']
        dropDown.appendChild(option);
    }

    dropdownDisplay.appendChild(dropDown)   
    return dropDown
};

const foodSelector = creatDropDown(foodDict);

function getFoodChoices(foodSelector) {
    userFood = []
    const selectedOptions = foodSelector.selectedOptions
    // take selected indexes and add corresponding foodDict to userFood
    for (let index of selectedOptions) {
        let foodOption = index.value
        userFood.push(foodDict[foodOption])
        console.log('Selecting ' + foodOption)
    }
}

const theBody = document.querySelector("body");


const theFood = document.getElementById('foodResult')
// Draw new food results display
function drawFoodImages(foodObj, date){
    // receives array of foodobj
    console.log('Serving image received')
    console.log(foodObj)
    // create new div
    const newImgDiv = document.createElement('div')
    newImgDiv.classList.add('foodImageDiv')
    const dateLabel = document.createElement('h6')
    dateLabel.textContent = date
    newImgDiv.appendChild(dateLabel)
    for (let i = 0; i < foodObj.length; i ++) {
        newImgDiv.appendChild(addFoodImage(foodObj[i].src))
    }
    theFood.appendChild(newImgDiv)
    console.log('Food served.')
}
// creates food icon
function addFoodImage(foodImageSrc) {
    // creates new images element
    const newImg = document.createElement("img");
    // adds the pizza icon
    newImg.src = foodImageSrc;
    return newImg
};







