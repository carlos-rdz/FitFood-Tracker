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
.then(j => j.json())
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
takeDateRange();
// fetchExcerciseData();

// =====================================================================================================================================================================================================

function creatDropDown(foodDict) {

        let dropDown = document.createElement('select');
        foodDict.forEach(foodItem => {
        let option = document.createElement("option");
        option.value = foodItem['name']
        option.textContent =  foodItem['name']
        dropDown.appendChild(option);
    console.log(option.value)
    })

    dropDown.addEventListener('change',e => {
        console.log(e.target.selectedIndex)
      const foodImages = document.querySelectorAll('img')
      foodImages.forEach((foodImage) => {
          foodImage.src = foodDict[e.target.selectedIndex].src
        // console.log(foodImages)
      })
        
})
 

    theBody.appendChild(dropDown)   
};

const theBody = document.querySelector("body");

let foodImage = "https://png.icons8.com/color/50/000000/pizza.png"
function addPizza() {
    // creates new images element
    const newImg = document.createElement("img");
    // adds the pizza icon
    const newPizza = document.createAttribute("src");
    newImg.src = foodImage;
    theBody.appendChild(newImg);
};
// prints mulitple pizza icons within a range

function servingImageDisplay(foodObj){

    for (let i = 0; i < foodObj.servings; i ++) {
        addPizza();

}
}
// creates food dictionary
const foodDict = [
    {name:'pizza', src: "https://png.icons8.com/color/50/000000/pizza.png"},
    {name:'hamburger',src:"https://png.icons8.com/color/40/000000/hamburger.png"},
    {name:'iceCream',src:"https://png.icons8.com/color/40/000000/banana-split.png"},
    {name:'fries', src: "https://png.icons8.com/color/40/000000/french-fries.png"},
    {name:'celery', src: "https://png.icons8.com/color/40/000000/celery.png"},
    {name:'chips', src: "https://png.icons8.com/color/40/000000/nachos.png"},
    {name:'candyBar', src: "https://png.icons8.com/color/40/000000/chocolate-bar.png"},
    {name:'beer', src: "https://png.icons8.com/color/40/000000/beer.png"},
    {name:'taco', src: "https://png.icons8.com/color/40/000000/taco.png"},
    {name:'cupCake', src: "https://png.icons8.com/color/40/000000/cupcake.png"}
    
]

creatDropDown(foodDict);
