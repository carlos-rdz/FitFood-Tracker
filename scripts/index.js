let topContainer = document.getElementsByClassName("topcontainer")[0]
let fitDisplay = document.querySelector("[data-displayInfo]");
let profileHeader = document.querySelector("[data-profileHeader]");
let dateSlider = document.querySelector("input.slider")
let submitButton = document.getElementById('submitButton')

// =============================================
// add an event listener to 
// determine date range
// =============================================
// dateSlider.addEventListener("click", getDateRange)
submitButton.addEventListener('click', () => {
    getDateRange(dateSlider)
    getFoodChoices(foodSelector)
})

function getDateRange(dateSlider) {

    let todaysDate = new Date()
    let parsedDate = `${todaysDate.getFullYear()}-${('0' + (todaysDate.getMonth()+1)).slice(-2)}-${('0' + todaysDate.getDate()).slice(-2)}`;
    
    let endDate = new Date()
    endDate.setDate(endDate.getDate()-dateSlider.value)

    let parsedEndDate = `${endDate.getFullYear()}-${('0' + (endDate.getMonth()+1)).slice(-2)}-${('0' + endDate.getDate()).slice(-2)}`;


    console.log(parsedDate);
    console.log(parsedEndDate);

    fetchExcerciseData(parsedEndDate,parsedDate);
    
}

// =============================================
// function that fetches Profle data and 
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

function returnStubData() {
    console.log('Returning stub data')
    const data =  {user: {fullName: 'Stub User'}, activityCalories: 2000,
            summary: {activityCalories: 2000, distances: [, , , {distance: 25}]}}
    console.log(data)
    return data
}

// =============================================
// function that fetches excercise data and 
// runs the promise chain
// =============================================

function fetchExcerciseData(date1,date2){
    


    fetch(`https://api.fitbit.com/1/user/-/activities/tracker/activityCalories/date/${date2}/${date1}.json`,
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
.then(extractExerciseData)
.then(requestFood)
.then(servingImageDisplay)
}
// =============================================
// strips the data to individual componenets and
// returns the # of calories burnt as an integer
// =============================================

function extractExerciseData(info){
    let calorieDataArray = info['activities-tracker-activityCalories']
    
    let totalCalories = 0

    calorieDataArray.forEach(function(element){

        totalCalories += parseInt(element["value"])
    });
    
    let calorieMessage = `Calories: ${totalCalories}`;
    let displayData = [calorieMessage];
    
    writeExerciseData(displayData)

    return totalCalories
}
// =============================================
// helper function that writes data to the 
// document
// =============================================
function writeExerciseData(message){
   
    message.forEach(element => {
        // elementDisplay = document.createElement('div');
        fitDisplay.textContent = element;
        // fitDisplay.appendChild(elementDisplay);

    });
}

fetchProfileData();
// takeDateRange();
// fetchExcerciseData();

// =====================================================================================================================================================================================================

function creatDropDown(foodDict) {
    let dropDown = document.createElement('select');
    dropDown.classList.add('foodSelector')
    foodDict.forEach(foodItem => {
        let option = document.createElement("option");
        option.value = foodItem['name']
        option.textContent =  foodItem['name']
        dropDown.appendChild(option);
        console.log(option.value)
    })

    dropDown.addEventListener('change', getFoodChoices)
    topContainer.appendChild(dropDown)   
    return dropDown
};

function getFoodChoices(foodSelector) {
    console.log(foodDict[foodSelector.selectedIndex].name + ' selected.')
    userFood = foodDict[foodSelector.selectedIndex];
    requestFood(userCaloriesBurned).then(servingImageDisplay)
}

const theBody = document.querySelector("body");
const theFood = document.getElementById('foodResult')

// let foodImage = "https://png.icons8.com/color/50/000000/pizza.png"
function addPizza(foodImageSrc) {
    // creates new images element
    const newImg = document.createElement("img");
    // adds the pizza icon
    newImg.src = foodImageSrc;
    theFood.appendChild(newImg);
};
// prints mulitple pizza icons within a range

function servingImageDisplay(foodObj){
    console.log('Serving image received: ' + foodObj.name)
    foodSelector.selectedIndex = foodDict.indexOf(foodObj)
    // clear old foodImages
    // debugger
    while (theFood.childNodes.length > 0) {
        theFood.childNodes[0].remove()
    }
    for (let i = 0; i < foodObj.servings; i ++) {
        addPizza(foodObj.src);
    }
    console.log('Food served.')
}

const foodSelector = creatDropDown(foodDict);
