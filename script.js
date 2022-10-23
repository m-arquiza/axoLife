/*  *.* GLOBAL VARS
    timers: is timer on, time timer is set to
*/
let timerOn = false;
let timeSet;
let timeLength = 1500;

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
    localStorage.clear();
    timerOn = true;
    timeSet = new Date(new Date().getTime() + timeLength * 1000);
});

/* variable function to end timer on end .*/
document.getElementsByClassName("end")[0].addEventListener("click", function(){
    localStorage.clear();
    timerOn = false;

    document.getElementsByClassName("time")[0].innerHTML = milliseconds_toString(timeLength * 1000);
});



/*  *.* SPACER TITLE
    gen title
*/
/* indiv title.*/


/*  *.* SPACER TITLE
    gen title
*/
/* indiv title.*/


/*  *.* HELPER FUNCTIONS
    time conversion
*/
/* convert milliseconds to mins and seconds as a formatted string.*/
function milliseconds_toString(time){
    return (Math.floor((time/1000)/60) + ":" + Math.floor((time/1000)%60).toLocaleString(undefined,{minimumIntegerDigits: 2}))
}