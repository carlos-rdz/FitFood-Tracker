// creates food dictionary
const foodDict = [
    { name:'pizza', src: "https://png.icons8.com/color/50/000000/pizza.png"},
    { name:'hamburger',src:"https://png.icons8.com/color/40/000000/hamburger.png"},
    { name:'ice cream',src:"https://png.icons8.com/color/40/000000/banana-split.png"},
    { name:'fries', src: "https://png.icons8.com/color/40/000000/french-fries.png"},
    { name:'celery', src: "https://png.icons8.com/color/40/000000/celery.png"},
    { name:'chips', src: "https://png.icons8.com/color/40/000000/nachos.png"},
    { name:'candy bar', src: "https://png.icons8.com/color/40/000000/chocolate-bar.png"},
    { name:'beer', src: "https://png.icons8.com/color/40/000000/beer.png"},
    { name:'taco', src: "https://png.icons8.com/color/40/000000/taco.png"},
    { name:'cupcake', src: "https://png.icons8.com/color/40/000000/cupcake.png"}   
]
// create and return a random food choice 
function randomFoodChoice() {
    return foodDict[Math.floor(Math.random() * foodDict.length)];
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
    console.log(`User selected ${userFood[0].name}.`)
    console.log(`User logged ${userCaloriesBurned} calories burned.`);
    return fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${userFood[0].name}&detailed=true&branded=false`,
    {
        headers: {
            'x-app-key': '537d92da8786ace37bbf7c591100dfdc',
            'x-app-id': '39f9cd3c',
            'x-remote-user-id': '0',
        }
    })
    .then(convertToJSON)
    // .then(extractFood)
    // .then(drawFood)
    .then(extractFood)
    .catch(() => console.log("Could not receive food."));
}

function convertToJSON(r) {
    return r.json();
}

function extractFood(resultsList) {
    let foodResult = foodDict[0]
    const foodName = resultsList.common[0].food_name;
    const foodCalories = resultsList.common[0].full_nutrients[4].value;
    console.log('Food result received. Name: ' + foodName + ' Calories: ' + foodCalories);
    foodServings = convertCalToNumServings(foodCalories, userCaloriesBurned);
    for (let food of foodDict) {
        if (food.name === foodName) {
            foodResult = food
            break
        }
    }
    foodResult.servings = foodServings
    console.log(`Burned equivalent of ${foodResult.servings} of ${foodResult.name}`);
    return foodResult;
}

function convertCalToNumServings(foodCalories, caloriesBurned) {
    console.log('Converting calories to servings...')
    let servings = 0;
    while (foodCalories * servings < caloriesBurned) {
        servings++;
    }
    return servings;
}