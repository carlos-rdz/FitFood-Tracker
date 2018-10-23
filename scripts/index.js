let fitDisplay = document.querySelector("[data-displayInfo]")


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

function writeData(message){

    message.forEach(element => {
        elementDisplay = document.createElement('div')
        elementDisplay.textContent = element
        fitDisplay.appendChild(elementDisplay)
    });
    

}

fetchdata()


