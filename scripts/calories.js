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
let userFood = [randomFoodChoice(), randomFoodChoice()]
// store user's calories burned here
// could use array like food choices
let userCaloriesArray = [];
// const returnServin  gs = {};

function requestFood(caloriesArray) {
    console.log(caloriesArray, userFood)
    // capture user calories array
    userCaloriesArray = caloriesArray;
    let foodPromises = []
    // request calorie info for users selected food choices
    userFood.forEach(foodItem => {
        console.log(`User selected ${foodItem.name}.`)
        let foodPromise = fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${foodItem.name}&detailed=true&branded=false`,
                            {
                                headers: {
                                    'x-app-key': '51c9ea63eedf0df881f39c24017f15db',
                                    'x-app-id': '2ce385c3',
                                    'x-remote-user-id': '0'
                                }
                            })
                            .then(convertToJSON)
                            .catch(returnStubFood)
                            .then(extractFood)
        foodPromises.push(foodPromise)
    })
    // create array of fetch promises for each userFood

    console.log(foodPromises)
    // wait for all userFood fetch requests to return
    Promise.all(foodPromises)
    .then(drawUserCalData)
}

function convertToJSON(r) {
    if (r.ok) {
        return r.json()
    }
    throw new Error('Food request not ok')
}

function returnStubFood() {
    console.log('Returning stub food')
    const stubFood = {
        common: [
            {food_name: 'pizza', 
            full_nutrients: [
                , , , , {value: 250}
            ]}
        ]
    }
    return stubFood
}

function extractFood(resultsList) {
    // declare foodResult variable
    let foodResult
    const foodName = resultsList.common[0].food_name;
    const foodCalories = resultsList.common[0].full_nutrients[4].value;
    console.log('Food result received. Name: ' + foodName + ' Calories: ' + foodCalories);
    // get food object out of food dictionary
    for (let food in foodDict) {
        // console.log(`Found ${foodDict[food]['name']} in foodDict`)
        if (foodDict[food]['name'] === foodName) {
            foodResult = foodDict[food]
            break
        }
    }
    // converts foodResult to array of food items
    foodResult.calories = foodCalories
    // foodResult = convertCalToNumServings(foodResult, foodCalories)
    // if (foodResult.length > 0) {
    //     console.log(`Burned equivalent of ${foodResult.length} of ${foodResult[0].name}`);
    // }
    return foodResult;
}

const dateDropDown = document.getElementById('dateDropDown')
let userGraphChoice = 'day'
dateDropDown.addEventListener('change', e => {
    const option = e.target.selectedOptions[0]
    userGraphChoice = option.value
    console.log('User selected ' + userGraphChoice)
})

function drawUserCalData(foodArray) {
    // clear old foodImages
    console.log('Drawing user calorie data as food')
    while (theFood.childNodes.length > 0) {
        theFood.childNodes[0].remove()
    }
    console.log(userCaloriesArray, foodArray)
    // check what date range formatting user select
    const userDataArray = formatUserData(userCaloriesArray);
    
    userDataArray.forEach( calorieData => {
        console.log(calorieData)
        let servings = convertCalToNumServings(foodArray, calorieData.value)
        console.log(servings)
        drawFoodImages(servings, calorieData.dateTime)
        // const br = document.createElement('br')
        // theFood.appendChild(br)
    })
}

function formatUserData(caloriesArray) {
    const userDateRange = document.getElementById('dateDropDown').value
    console.log(`User has selected to see data by ${userDateRange}`)
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
    for (let i = 0; i < caloriesArray.length; i++) {
        if (count == 1 && userRange != 1) {
            newDateTime.push(caloriesArray[i].dateTime)
        }
        if (count >= userRange || i == caloriesArray.length - 1) {
            newDateTime.push(caloriesArray[i].dateTime)
            calorieCount += parseInt(caloriesArray[i].value)
            newCaloriesArray.push({dateTime: newDateTime.join(' - '), value: calorieCount})
            newDateTime = []
            calorieCount = 0
            count = 1
            continue
        }
        calorieCount += caloriesArray[i].value
        count++
    }
    return newCaloriesArray
}

function convertCalToNumServings(foodArray, userCaloriesBurned) {
    console.log('Converting calories to servings...' + userCaloriesBurned)
    let servings = [];
    // sort food items by calories
    console.log(foodArray)
    foodArray.sort((foodItem1, foodItem2) => foodItem1.calories < foodItem2.calories)
    // add servings
    foodArray.forEach(foodItem => {
        console.log(foodItem.name, foodItem.calories, userCaloriesBurned)
        while (foodItem.calories <= userCaloriesBurned) {
            console.log(foodItem.calories, userCaloriesBurned)
            console.log(`Adding serving of ${foodItem.name}`)
            servings.push(foodItem);
            userCaloriesBurned -= foodItem.calories
        }
        console.log(userCaloriesBurned + ' user calories remaining.')
    })
    console.log(servings)
    console.log(`Returning servings ${servings.map(item => item.name).join(', ')}`)
    // return array with number of servings of food object in it
    return servings;
}