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
    // add the pizza icon
    const newPizza = document.createAttribute("src");
    newImg.src = "https://png.icons8.com/color/50/000000/pizza.png";
    theBody.appendChild(newImg);
};

    for (let i = 0; i < 10; i ++) {
        addPizza();
    }



// addPizza();
// addPizza();
// addPizza();
// addPizza();
// addPizza();