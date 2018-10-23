function getToken(){

let hash = window.location.hash
let parts = hash.split("&");
let token = parts[0].split('=');
let ourtoken = token[1];

return ourtoken
}


function saveToLocalStorage(){

    localStorage.setItem('ourtoken',getToken())


}


saveToLocalStorage()
