// creates food dictionary of foodObjects
const foodDict = {
    pizza: {name:'pizza', src: "https://png.icons8.com/color/50/000000/pizza.png"},
    hamburger: {name:'hamburger',src:"https://png.icons8.com/color/40/000000/hamburger.png"},
    iceCream: {name:'ice cream',src:"https://png.icons8.com/color/40/000000/banana-split.png"},
    fries: {name:'fries', src: "https://png.icons8.com/color/40/000000/french-fries.png"},
    celery: {name:'celery', src: "https://png.icons8.com/color/40/000000/celery.png"},
    chips: {name:'chips', src: "https://png.icons8.com/color/40/000000/nachos.png"},
    candyBar: {name:'candy bar', src: "https://png.icons8.com/color/40/000000/chocolate-bar.png"},
    beer: {name:'beer', src: "https://png.icons8.com/color/40/000000/beer.png"},
    taco: {name:'taco', src: "https://png.icons8.com/color/40/000000/taco.png"},
    cupCake: {name:'cupcake', src: "https://png.icons8.com/color/40/000000/cupcake.png"}   
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
let userCaloriesBurned = 0;
// const returnServin  gs = {};

function requestFood(caloriesBurned) {
    console.log(userCaloriesBurned, caloriesBurned)
    userCaloriesBurned = caloriesBurned;
    console.log(`User logged ${userCaloriesBurned} calories burned.`);
    let foodPromises = []
    userFood.forEach(foodItem => {
        console.log(`User selected ${foodItem.name}.`)
        let foodPromise = fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${foodItem.name}&detailed=true&branded=false`,
                            {
                                headers: {
                                    'x-app-key': '537d92da8786ace37bbf7c591100dfdc',
                                    'x-app-id': '39f9cd3c',
                                    'x-remote-user-id': '0'
                                }
                            })
                            .then(convertToJSON)
                            .catch(returnStubFood)
                            .then(extractFood)
        foodPromises.push(foodPromise)
    })
    // create array of fetch promises for each userFood

    
    // wait for all userFood fetch requests to return
    return Promise.all(foodPromises)
        .then(convertCalToNumServings)
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

function convertCalToNumServings(foodArray) {
    console.log('Converting calories to servings...')
    let servings = [];
    userCalories = userCaloriesBurned
    // sort food items by calories
    foodArray.sort((foodItem1, foodItem2) => foodItem1.calories < foodItem2.calories)
    // add servings
    foodArray.forEach(foodItem => {
        while (foodItem.calories <= userCalories) {
            console.log(foodItem.calories, userCalories)
            console.log(`Adding serving of ${foodItem.name}`)
            servings.push(foodItem);
            userCalories -= foodItem.calories
        }
        console.log(userCalories + ' user calories remaining.')
    })
    // return array with number of servings of food object in it
    return servings;
}