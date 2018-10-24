let fitDisplay = document.querySelector("[data-displayInfo]");
let profileHeader = document.querySelector("[data-profileHeader]");
// =============================================
// function that fetches excercise data and 
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


function fetchExcerciseData(){
let date = '2018-10-24';

fetch(`https://api.fitbit.com/1/user/-/activities/date/${date}.json`,
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
    let calorieData = info["summary"]["activityCalories"];
    let distanceData = info["summary"]["distances"][3]
    ["distance"];
    // let stepData = info["summary"]["steps"];
    let calorieMessage = `Calories: ${calorieData}`;
    let distanceMessage = `Distance: ${distanceData}km`;
    // let stepMessage = `Steps: ${stepData}`;
    let displayData = [calorieMessage,distanceMessage];
    
    writeExerciseData(displayData)

    return 1000
}
// =============================================
// helper function that writes data to the 
// document
// =============================================
function writeExerciseData(message){
   
    message.forEach(element => {
        elementDisplay = document.createElement('div');
        elementDisplay.textContent = element;
        fitDisplay.appendChild(elementDisplay);

    });
}

fetchProfileData();
fetchExcerciseData();

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

    dropDown.addEventListener('change', e => {
        console.log(foodDict[e.target.selectedIndex].name + ' selected.')
        // const foodImages = document.querySelectorAll('img')
        // foodImages.forEach(foodImage => {
        // foodImage.src = foodDict[e.target.selectedIndex].src
        // console.log(foodImages)
        userFood = foodDict[e.target.selectedIndex];
        requestFood(userCaloriesBurned).then(servingImageDisplay)
      })
    theBody.appendChild(dropDown)   
    return dropDown
};

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
    console.log('Image served.')
}

const foodSelector = creatDropDown(foodDict);
