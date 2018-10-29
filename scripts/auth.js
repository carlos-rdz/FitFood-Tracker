function getToken(){

// pulls URL from auth page
let hash = window.location.hash;
// Splits string by &
let parts = hash.split("&");
// continue to split index 0 by =
let token = parts[0].split('=');
// gets our key from the split string
let ourtoken = token[1];

return ourtoken
}


function saveToLocalStorage(){
    debugger
    localStorage.setItem('ourtoken',getToken())


}


saveToLocalStorage()

window.location = "/display.html";



