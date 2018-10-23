fetch("https://api.fitbit.com/1/user/-/profile.json",
{
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("ourtoken")}`

    }
}
)
.then(console.log)