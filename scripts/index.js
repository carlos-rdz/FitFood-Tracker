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
.then(j => j.json())
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


function fetchExcerciseData(){
let date = '2018-10-24';

fetch(`https://api.fitbit.com/1/user/-/activities/date/${date}.json`,
{
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("ourtoken")}`

    }
}
)
.then(j => j.json())
.then(extractExerciseData)
.then(console.log)
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

    return calorieData
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



const theBody = document.querySelector("body");
function addPizza() {
    // creates new images element
    const newImg = document.createElement("img");
    // adds the pizza icon
    const newPizza = document.createAttribute("src");
    newImg.src = "https://png.icons8.com/color/50/000000/pizza.png";
    theBody.appendChild(newImg);
};
    // prints mulitple pizza icons within a range
    for (let i = 0; i < 10; i ++) {
        addPizza();
    }

    // creates food dictionary
const foodDict = {
    pizza: "https://png.icons8.com/color/50/000000/pizza.png",
    hamburger:"https://png.icons8.com/color/40/000000/hamburger.png",
    iceCream: "https://png.icons8.com/color/40/000000/banana-split.png",
    fries: "https://png.icons8.com/color/40/000000/french-fries.png",
    celery: "https://png.icons8.com/color/40/000000/celery.png",
    chips: "https://png.icons8.com/color/40/000000/nachos.png",
    candyBar: "https://png.icons8.com/color/40/000000/chocolate-bar.png",
    beer: "https://png.icons8.com/color/40/000000/beer.png",
    taco: "https://png.icons8.com/color/40/000000/taco.png",
    cupCake: "https://png.icons8.com/color/40/000000/cupcake.png"

}

