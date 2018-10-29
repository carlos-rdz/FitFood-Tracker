// creates food dictionary of foodObjects
const foodDict = {
    pizza: {name:'pizza', src: "https://png.icons8.com/color/50/000000/pizza.png"},
    hamburger: {name:'hamburger',src:"https://png.icons8.com/color/40/000000/hamburger.png"},
    // iceCream: {name:'ice cream',src:"https://png.icons8.com/color/40/000000/banana-split.png"},
    fries: {name:'fries', src: "https://png.icons8.com/color/40/000000/french-fries.png"},
    celery: {name:'celery', src: "https://png.icons8.com/color/40/000000/celery.png"},
    // chips: {name:'chips', src: "https://png.icons8.com/color/40/000000/nachos.png"},
    // candyBar: {name:'candy bar', src: "https://png.icons8.com/color/40/000000/chocolate-bar.png"},
    beer: {name:'beer', src: "https://png.icons8.com/color/40/000000/beer.png"},
    taco: {name:'taco', src: "https://png.icons8.com/color/40/000000/taco.png"},
    // cupCake: {name:'cupcake', src: "https://png.icons8.com/color/40/000000/cupcake.png"},   
    candy: {name:'candy', src: "https://png.icons8.com/color/40/000000/cupcake.png"},   
    chocolate: {name:'chocolate', src: "https://png.icons8.com/color/40/000000/chocolate-bar.png"},   
    apple: {name:'apple', src: "https://png.icons8.com/color/40/000000/nachos.png"},   
}

// create and return a random food choice 
function randomFoodChoice() {
    const randomNumber = Math.floor(Math.random() * Object.keys(foodDict).length)
    let i = 0
    for (let foodItem in foodDict) {
        if (i == randomNumber) {
            return foodDict[foodItem]
        }
        i++
    }
}
// store user's food choices here
// two random food choices
let userFood = []
// store user's calories burned here
// could use array like food choices
let userCaloriesArray = [];
// const returnServin  gs = {};

// fetch foodData as soon as page loads
function requestFood() {
    let foodPromises = []
    // request calorie info for all food choices
    // userFood.forEach(foodItem => {
    for (let foodItem in foodDict) {   
        console.log(`Requesting food calorie info ${foodDict[foodItem].name}.`)
        let foodPromise = fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${foodDict[foodItem].name}&detailed=true&branded=false`,
                            {
                                headers: {
                                    'x-app-key': '51c9ea63eedf0df881f39c24017f15db',
                                    'x-app-id': '2ce385c3',
                                    'x-remote-user-id': '0'
                                }
                            })
                            .then(convertToJSON)
                            .then(extractFood)
                            .catch(returnStubFood)
                            // .then(getFoodChoices)
        foodPromises.push(foodPromise)
    }
    return Promise.all(foodPromises)
}
// call function to get calorie data for food options
// requestFood()

function drawFood(endDate) {
    // clear old foodImages
    console.log('Drawing user calorie data as food')
    while (theFood.childNodes.length > 0) {
        theFood.childNodes[0].remove()
    }
    console.log(userCaloriesArray, userFood, endDate)
    // check what date range formatting user select
    
    const userDataArray = formatUserData(userCaloriesArray, endDate);

    calculateTotalCalories(userDataArray);
    
    userDataArray.forEach( calorieData => {
        console.log(calorieData)
        let servings = convertCalToNumServings(userFood, calorieData.value)
        console.log(servings)
        drawFoodImages(servings, calorieData.dateTime)
        // const br = document.createElement('br')
        // theFood.appendChild(br)
    })
}

function convertToJSON(r) {
    if (r.ok) {
        return r.json()
    }
    throw new Error('Food request not ok')
}

function returnStubFood() {
    console.log('Returning stub food')
    let stubCalories = 550
    for (let foodItem in foodDict) {
        foodDict[foodItem].calories = stubCalories
        stubCalories -= 50
    }
}

function extractFood(resultsList) {
    // declare foodResult variable
    const foodName = resultsList.common[0].food_name;
    const foodCalories = resultsList.common[0].full_nutrients[4].value;
    console.log('Food result received. Name: ' + foodName + ' Calories: ' + foodCalories);
    // get food object out of food dictionary
    for (let food in foodDict) {
        // console.log(`Found ${foodDict[food]['name']} in foodDict`)
        if (foodDict[food]['name'] === foodName) {
            // foodResult = 
            foodDict[food].calories = foodCalories
            break
        } 
    }
}


function formatUserData(caloriesArray, endDate) {
    const userDateRange = document.getElementById('dateDropDown').value
    console.log(`User has selected to see data by ${userDateRange} with end date ${endDate}`)
    let userRange
    switch (userDateRange) {
        case 'day':
        userRange = 1
        break
        case 'week':
        userRange = 7
        break
        case 'month':
        userRange = 30
        break
        case 'year':
        userRange = 365
        break
    }
    newCaloriesArray = []
    let newDateTime = []
    let calorieCount = 0
    count = 1
    // endDate = dateTimeFormat(endDate)
    for (let i = caloriesArray.length - 1; i < caloriesArray.length; i--) {  
        calorieCount += parseInt(caloriesArray[i].value)
        if (caloriesArray[i].dateTime === endDate || i == 0) {
            // if we have reached the determined end date, quit collecting data
            // or if we have reached the end of the calorie data
            newDateTime.push(caloriesArray[i].dateTime)
            // calorieCount += caloriesArray[i].value
            newCaloriesArray.push({dateTime: newDateTime.join('\n - \n'), value: calorieCount})
            console.log(newCaloriesArray[newCaloriesArray.length - 1].dateTime)
            break
        } else if (count == 1 && userDateRange != 'day') {
            // if this is the first data point for this row     
            // don't add first date string for daily report
            newDateTime.push(caloriesArray[i].dateTime)
        // if this is the last data point for this row
        } else if (count >= userRange) {
            newDateTime.push(caloriesArray[i].dateTime)
            // calorieCount += caloriesArray[i].value
            newCaloriesArray.push({dateTime: newDateTime.join('\n - \n'), value: calorieCount})
            newDateTime = []
            calorieCount = 0
            count = 1
            continue
        }
        count++
    }
    return newCaloriesArray
}

function dateTimeFormat(dateString) {
    // console.log(dateString)
    // debugger
    let newDateString = dateString.split('-')
    let yearString = newDateString.shift().split('')
    yearString.splice(0, 2)
    newDateString.push(yearString.join(''))
    return newDateString.join('-')
}

function convertCalToNumServings(foodArray, userCaloriesBurned) {
    console.log('Converting calories to servings...' + userCaloriesBurned)
    let servings = [];
    // sort food items by calories
    console.log(foodArray)
    foodArray.sort((foodItem1, foodItem2) => foodItem1.calories < foodItem2.calories)
    // add servings
    foodArray.forEach(foodItem => {
        // console.log(foodItem.name, foodItem.calories, userCaloriesBurned)
        while (foodItem.calories <= userCaloriesBurned) {
            // console.log(foodItem.calories, userCaloriesBurned)
            // console.log(`Adding serving of ${foodItem.name}`)
            servings.push(foodItem);
            userCaloriesBurned -= foodItem.calories
        }
        // console.log(userCaloriesBurned + ' user calories remaining.')
    })
    console.log(servings)
    console.log(`Returning servings ${servings.map(item => item.name).join(', ')}`)
    // return array with number of servings of food object in it
    return servings;
}


function calculateTotalCalories(rangeData){

    let totalCalories = 0
    rangeData.forEach(function(element){
        
        totalCalories += parseInt(element["value"])
    });
    
    let calorieMessage = `Total Calories: ${totalCalories}`;
    // let displayData = [calorieMessage;
    writeExerciseData(calorieMessage)

    achievements(totalCalories)
    // return totalCalories
}