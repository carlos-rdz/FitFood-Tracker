const clickLink = document.getElementsByClassName('click-link')[0]
const thisURL = window.location.host
clickLink.setAttribute('href', `https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22D4LM&redirect_uri=http%3A%2F%2F${thisURL}%2Ffitbit.html&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800`)