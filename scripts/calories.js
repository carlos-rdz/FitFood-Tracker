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
    const randomNumber = Math.floor(Math.random() * foodDict.length)
    let foodChoice = foodDict['pizza']
    let i = 0
    for (let foodItem in foodDict) {
        if (i > randomNumber) {
            break
        }
        foodChoice = foodDict[foodItem]
        i++
    }
    return foodChoice
}
// store user's food choices here
// two random food choices
let userFood = [randomFoodChoice(), randomFoodChoice()]
// store user's calories burned here
// could use array like food choices
let userCaloriesBurned = 0;
// const returnServin  gs = {};

function requestFood(caloriesBurned) {
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
                            // .then(extractFood)
                            // .then(drawFood)
                            .then(extractFood)
                            .catch(() => console.log("Could not receive food."))
        foodPromises.push(foodPromise)
    })
    // create array of fetch promises for each userFood

    
    // wait for all userFood fetch requests to return
    return Promise.all(foodPromises)
        .then(foodArray => {
            return foodArray.flat()
        })
}

function convertToJSON(r) {
    return r.json();
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
    foodResult = convertCalToNumServings(foodResult, foodCalories);
    console.log(`Burned equivalent of ${foodResult.length} of ${foodResult[0].name}`);
    return foodResult;
}

function convertCalToNumServings(foodItem, foodCalories) {
    // return array with number of servings of food object in it
    console.log('Converting calories to servings...')
    let servings = [];
    while (foodCalories < userCaloriesBurned) {
        servings.push(foodItem);
        userCaloriesBurned -= foodCalories
    } 
    return servings;
}