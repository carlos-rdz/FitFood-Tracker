let fitDisplay = document.querySelector("[data-displayInfo]");
let profileHeader = document.querySelector("[data-profileHeader]");
let dateSlider = document.querySelector("[data-slider]")

// =============================================
// function that adds an event listener to 
// determine date range
// =============================================

function takeDateRange(){

dateSlider.addEventListener("click", e => {
    
    console.log(e.target.value)

    let todaysDate = new Date()
    let parsedDate = `${todaysDate.getFullYear()}-${('0' + (todaysDate.getMonth()+1)).slice(-2)}-${('0' + todaysDate.getDate()).slice(-2)}`;
    
    let endDate = new Date()
    endDate.setDate(endDate.getDate()-e.target.value)

    let parsedEndDate = `${endDate.getFullYear()}-${('0' + (endDate.getMonth()+1)).slice(-2)}-${('0' + endDate.getDate()).slice(-2)}`;


    console.log(parsedDate);
    console.log(parsedEndDate);

    fetchExcerciseData(parsedEndDate,parsedDate);
    
})


}
takeDateRange();


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
function fetchExcerciseData(date1,date2){
    
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
.then(requestFood)
.then(servingImageDisplay)
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
    let calorieDataArray = info['activities-tracker-activityCalories']
    
    let totalCalories = 1000

    // calorieDataArray.forEach(function(element){

    //     totalCalories += parseInt(element["value"])
    // });
    
    let calorieMessage = `Calories: ${totalCalories}`;
    let displayData = [calorieMessage];
    writeExerciseData(displayData)
    // return stub data for testing
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
takeDateRange();
// fetchExcerciseData();

// =====================================================================================================================================================================================================

function creatDropDown(foodDict) {
    // create dropdown element
    let dropDown = document.createElement('select');
    // add options
    for (let foodItem in foodDict) {
        let option = document.createElement("option");
        option.value = foodItem
        option.textContent =  foodDict[foodItem]['name']
        dropDown.appendChild(option);
        // console.log(option.value)
    }
    // modify dropdown
    dropDown.classList.add('foodSelector')
    dropDown.multiple = true
    dropDown.addEventListener('change', selectFoodTypes)
    // append to body
    theBody.appendChild(dropDown)   
    // return reference to dropdown for later use
    return dropDown
};

// event listener for dropdown
function selectFoodTypes(e) {
    // reset userFood value
    userFood = []
    const selectedOptions = e.target.selectedOptions
    // take selected indexes and add corresponding foodDict to userFood
    for (let option of selectedOptions) {
        userFood.push(foodDict[option.value])
        console.log('Selecting' + option.value)
    }
    // for (let i = 0; i < selectedOptions.length; i++) {
    //     let option = selectedOptions[i].text
    //     userFood.push(foodDict[])
    // }
    console.log(userFood)
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
    // receives array of foodobj
    console.log('Serving image received')
    // foodSelector.selectedIndex = foodDict.indexOf(foodObj)
    // clear old foodImages
    while (theFood.childNodes.length > 0) {
        theFood.childNodes[0].remove()
    }
    for (let i = 0; i < foodObj.length; i ++) {
        addPizza(foodObj[i].src);
    }
    console.log('Food served.')
}

const foodSelector = creatDropDown(foodDict);
