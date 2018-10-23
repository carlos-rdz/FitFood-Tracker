// get references to html elements for displaying food data
const foodName = document.getElementById("food_name");
const servingSize = document.getElementById("serving_size");
const servingAmount = document.getElementById("serving_amount");
const caloriesCount = document.getElementById("calories_count");
const foodPhoto = document.getElementById("food_photo");

// create variables to store food terms and result from API call
const CALORIES_BURNED = 500;
const USER_FOOD = "hot sauce";
const foodResult = {};
const returnServings = {};

function requestFood(calories) {
    fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${USER_FOOD}&detailed=true&branded=false`,
    {
        headers: {
        'x-app-key': '51c9ea63eedf0df881f39c24017f15db',
        'x-app-id': '2ce385c3',
        'x-remote-user-id': '0',
        }
    })
    .then(convertToJSON)
    .then(extractFood)
    .then(drawFood)
    .then(() => {
        const servings = convertCalToNumServings(calories);
        returnServings.name = foodResult.name;
        returnServings.servings = servings;
        // console.log(`${servings} of ${foodResult.name}`);
    });
    return returnServings;
}

function convertToJSON(r) {
    return r.json();
}

function extractFood(j) {
    const result = j.common[0];
    const nutrients = result.full_nutrients;
    const size = result.serving_unit;
    const amount = result.serving_qty;
    const pic = result.photo.thumb;
    
    foodResult.name = result.food_name;
    nutrients.forEach(nutrient => {
        if (nutrient.attr_id == '208') { // 208 is code for kCal
            foodResult.calories = nutrient.value;
        }
    });
    foodResult.size = size;
    foodResult.amount = amount;
    foodResult.pic = pic;
}

function drawFood() {
    foodName.textContent = foodResult.name;
    console.log(foodResult.name);
    servingSize.textContent += foodResult.size;
    servingAmount.textContent += foodResult.amount;
    caloriesCount.textContent += foodResult.calories;
    foodPhoto.src = foodResult.pic;
}

function convertCalToNumServings(calories) {
    let servings = 0;
    while (foodResult.calories * servings < calories) {
        servings++;
    }
    return servings;
}

console.log(requestFood(CALORIES_BURNED));