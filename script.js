/*  *.* GLOBAL VARS
    timers: is timer on, time timer is set to, time length
    personal: name
*/
let timerOn = false;
let timeSet;
let timeLength = 1500;
let mode = ["home", "study", "nom", "nap"];

/*  *.* TIMER FUNCTIONS
    timer set, start and end buttons
*/
/* variable function to set timer.*/
setInterval(function() {
    if(timerOn === true) {
        // time right now
        let now = new Date().getTime();
        // time difference
        let diff = timeSet - now;

        // display time
        document.getElementsByClassName("time")[0].innerHTML = milliseconds_toString(diff)

        // end timer
        if (diff < 0) {
            clearInterval();
            document.getElementsByClassName("time")[0].innerHTML = "timer ended " + milliseconds_toTime(now);
            timerOn = false;
            localStorage.removeItem("timeSave");
        }
    }
}, 1000);

/* variable function to start timer on start .*/
document.getElementsByClassName("start")[0].addEventListener("click", function(){
    localStorage.removeItem("timeSave");
    timerOn = true;
    timeSet = new Date(new Date().getTime() + timeLength * 1000);
    localStorage.timeSave = timeSet;
});

/* variable function to end timer on end .*/
document.getElementsByClassName("end")[0].addEventListener("click", function(){
    timerOn = false;
    document.getElementsByClassName("time")[0].innerHTML = milliseconds_toString(timeLength * 1000);
    localStorage.removeItem("timeSave");
});



/*  *.* MODE FUNCTIONS
    switch mode text and mode axolotl based on button click
*/

/* sidebar function add event listeners.*/
document.getElementsByClassName("home-button")[0].addEventListener("click", function(){
    document.getElementsByClassName("axolotl")[0].src = "images/axolotl/home-axolotl.gif";
    document.getElementsByClassName("mode-text")[0].innerHTML = "welcome back~";
    localStorage.setItem("mode", "home");
});
document.getElementsByClassName("study-button")[0].addEventListener("click", function(){
    document.getElementsByClassName("axolotl")[0].src = "images/axolotl/study-axolotl.gif";
    document.getElementsByClassName("mode-text")[0].innerHTML = "it's time to grind~";
    localStorage.setItem("mode", "study");
});
document.getElementsByClassName("nom-button")[0].addEventListener("click", function(){
    document.getElementsByClassName("axolotl")[0].src = "images/axolotl/nom-axolotl.gif";
    document.getElementsByClassName("mode-text")[0].innerHTML = "nom nom~";
    localStorage.setItem("mode", "nom");
});
document.getElementsByClassName("nap-button")[0].addEventListener("click", function(){
    document.getElementsByClassName("axolotl")[0].src = "images/axolotl/nap-axolotl.gif";
    document.getElementsByClassName("mode-text")[0].innerHTML = "sleep tight~";
    localStorage.setItem("mode", "nap");
});

/* on first initialization, sets mode in storage to home*/
localStorage.setItem("mode", "home");

/*  *.* POPUP FUNCTIONS
    close and open popups, accept form submissions
*/
/* initial name- popup and set name.*/
if(localStorage.getItem("name") != null){
    document.getElementById("initial-popup").style.display = "none";
    document.getElementsByClassName("hello-text")[0].innerHTML = "hello, " + localStorage.getItem("name") + "!";
}
document.getElementById("name-submit").addEventListener("click", function(){
    let checkName = document.getElementById("name-value").value;
    if(!(checkName.length <= 12 && checkName.length > 0)){
        document.getElementsByClassName("initialPop")[0].style.display = "block";
    }else{
        localStorage.setItem("name", checkName);
        document.getElementsByClassName("hello-text")[0].innerHTML = "hello, " + localStorage.getItem("name") + "!";
        document.getElementById("initial-popup").style.display = "none";
    }
});

/* setting- open popup on gear click.*/
document.getElementsByClassName("gear")[0].addEventListener("click", function(){
    document.getElementById("settings-popup").style.display = "block";
});

/* setting- rename popup.*/
document.getElementById("rename-submit").addEventListener("click", function(){
    let check_name = document.getElementById("rename-value").value;
    if(!(check_name.length <= 12 && check_name.length > 0)){
        document.getElementsByClassName("settingsPop")[0].style.display = "block";
    }else{
        localStorage.setItem("name", check_name);
        document.getElementsByClassName("settingsPop")[0].style.display = "none";
        document.getElementsByClassName("hello-text")[0].innerHTML = "hello, " + localStorage.getItem("name") + "!";
    }
});

/* setting- change timer popup */
document.getElementById("time-change-submit").addEventListener("click", function(){
    let check_mins = Number(document.getElementById("minutes-value").value);
    let check_secs = Number(document.getElementById("seconds-value").value);
    if(isNaN(check_mins) || isNaN(check_secs)){
        document.getElementsByClassName("error2")[0].style.display = "block";
    }else{
        console.log(check_mins);
        console.log(check_secs);
        timeLength = (check_mins * 60 + check_secs);
        document.getElementsByClassName("time")[0].innerHTML = milliseconds_toString(timeLength * 1000);
        document.getElementsByClassName("error2")[0].style.display = "none";
    }
});

/* setting- close popup */
document.getElementById("settings-close").addEventListener("click", function(){
    document.getElementById("settings-popup").style.display = "none";
});



/*  *.* HELPER FUNCTIONS
    time conversion, valid name input
*/
/* convert milliseconds to mins and seconds as a formatted string */
function milliseconds_toString(time){
    return (Math.floor((time/1000)/60) + ":"
        + Math.floor((time/1000)%60).toLocaleString(undefined,{minimumIntegerDigits: 2}))
}
function milliseconds_toTime(time){
    return new Date(time).toLocaleTimeString("en-US");
}

/* loads timer and image in when window is reloaded*/
window.onload = function() {
    if(localStorage.timeSave != null){
        timeSet = Date.parse((localStorage.timeSave))
        timerOn = true;
    }
    if(localStorage.getItem("mode") != null){
        document.getElementsByClassName("axolotl")[0].src = ("images/axolotl/"
            + localStorage.getItem("mode") + "-axolotl.gif");
    }
};