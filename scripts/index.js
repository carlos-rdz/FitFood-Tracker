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


.then(console.log)


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

