let fitDisplay = document.querySelector("[data-displayInfo]")


// function that fetched data and runs the promise chain

function fetchdata(){

let date = '2018-10-23'

fetch(`https://api.fitbit.com/1/user/-/activities/date/${date}.json`,
// fetch(`https://api.fitbit.com/1/user/-/activities.json`,

{
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("ourtoken")}`

    }
}
)
.then(j => j.json())
.then(extractData)
.then(writeData)
.then(console.log)
// .then(displayData)

}



// strips the data to indivisual componenets

function extractData(info){
    let calorieData = info["summary"]["activityCalories"]
    let distanceData = info["summary"]["distances"][0]
    ["distance"]
    let stepData = info["summary"]["steps"]
    let calorieMessage = `Calories: ${calorieData}`
    let distanceMessage = `Distance: ${distanceData}`
    let stepMessage = `Steps: ${stepData}`
    return [calorieMessage,distanceMessage,stepMessage]
}


// writes data to the document

function writeData(message){

    message.forEach(element => {
        elementDisplay = document.createElement('div')
        elementDisplay.textContent = element
        fitDisplay.appendChild(elementDisplay)
    });
    

}

fetchdata()

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
      foodImages.src = foodDict[e.target.selectedIndex].src
        
        
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
for (let i = 0; i < 10; i ++) {
    addPizza();
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
