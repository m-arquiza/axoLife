/*  *.* GLOBAL VARS
    timers: is timer on, time timer is set to, time length
    personal: name
*/
let timerOn = false;
let timeSet;
let timeLength = 1500;
let name;

let modes = ["home", "study", "nom", "sleep"];
let modeOn = [false, false, false, false]

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
            document.getElementsByClassName("time")[0].innerHTML = milliseconds_toString(timeLength * 1000);
            timerOn = false;
            localStorage.clear();
        }
    }
}, 1000);

/* variable function to start timer on start .*/
document.getElementsByClassName("start")[0].addEventListener("click", function(){
    timerOn = true;
    timeSet = new Date(new Date().getTime() + timeLength * 1000);
});

/* variable function to end timer on end .*/
document.getElementsByClassName("end")[0].addEventListener("click", function(){
    timerOn = false;

    document.getElementsByClassName("time")[0].innerHTML = milliseconds_toString(timeLength * 1000);
});



/*  *.* MODE FUNCTIONS
    switch mode text and mode axolotl based on button click
*/

/* sidebar function add event listeners.*/
document.getElementsByClassName("home-button")[0].addEventListener("click", function(){
    document.getElementsByClassName("axolotl")[0].src = "images/axolotl/home-axolotl.gif";
    document.getElementsByClassName("mode-text")[0].innerHTML = "welcome back!";
});
document.getElementsByClassName("study-button")[0].addEventListener("click", function(){
    document.getElementsByClassName("axolotl")[0].src = "images/axolotl/study-axolotl.gif";
    document.getElementsByClassName("mode-text")[0].innerHTML = "it's time to grind!";
});
document.getElementsByClassName("nom-button")[0].addEventListener("click", function(){
    //document.getElementsByClassName("axolotl")[0].src = "images/axolotl/nom-axolotl.gif";
    document.getElementsByClassName("mode-text")[0].innerHTML = "nom nom!";
});
document.getElementsByClassName("sleep-button")[0].addEventListener("click", function(){
    //document.getElementsByClassName("axolotl")[0].src = "images/axolotl/sleep-axolotl.gif";
    document.getElementsByClassName("mode-text")[0].innerHTML = "sleep tight!";
});


/*  *.* POPUP FUNCTIONS
    close and open popups, accept form submissions
*/
/* initial name popup.*/
document.getElementById("name-submit").addEventListener("click", function(){
    let checkName = document.getElementById("name-value").value;
    console.log("clicked");
    if(!(checkName.length <= 12 && checkName.length > 0)){
        document.getElementById("error").style.display = "block";
        console.log("invalid")
    }else{
        name = checkName;
        document.getElementsByClassName("hello-text")[0].innerHTML = "hello, " + name + " :)";
        document.getElementById("initial-popup").style.display = "none";
    }
});


/*  *.* HELPER FUNCTIONS
    time conversion, valid name input
*/
/* convert milliseconds to mins and seconds as a formatted string */
function milliseconds_toString(time){
    return (Math.floor((time/1000)/60) + ":"
        + Math.floor((time/1000)%60).toLocaleString(undefined,{minimumIntegerDigits: 2}))
}
