fetch("https://api.fitbit.com/1/user/-/profile.json",
{
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("ourtoken")}`

    }
}
)
.then(j => j.json())
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

