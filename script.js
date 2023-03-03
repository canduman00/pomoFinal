//body, work-button, short-button, long-button, primary-button, timer

const main = document.body;

const work_button = document.querySelector(".work-button");
const short_button = document.querySelector(".short-button");
const long_button = document.querySelector(".long-button");

const timer = document.querySelector(".timer");

const primary_button = document.querySelector(".primary-button");

let minutes = 25;
let seconds = 0;
let active = 0;
let myTimer;
let click = new Audio("./src/click.wav");
let bell = new Audio("./src/bell.wav");

work_button.addEventListener("click", () => {
  setStatus("work");
});

short_button.addEventListener("click", () => {
  setStatus("sbreak");
});

long_button.addEventListener("click", () => {
  setStatus("lbreak");
});

primary_button.addEventListener("click", () => {
  countDownStarter();
  click.play();
});

function setStatus(status) {
  if (main.getAttribute("data-status") != status) {
    main.dataset.status = `${status}`;

    switch (status) {
      case "work":
        minutes = 25;
        seconds = 0;
        timer.innerHTML = "25:00";
        break;
      case "sbreak":
        minutes = 5;
        seconds = 0;
        timer.innerHTML = "05:00";
        break;
      case "lbreak":
        minutes = 15;
        seconds = 0;
        timer.innerHTML = "15:00";
    }

    active = 0;
    clearInterval(myTimer);
    buttonUpdate();
  }
}

function countDown() {
  if (minutes != 0 && seconds == 0) {
    minutes -= 1;
    seconds = 59;
  } else if (minutes == 0 && seconds == 0) {
    finished();
  } else {
    seconds -= 1;
  }

  timerUpdate(minutes, seconds);
  function timerUpdate(xminutes, xseconds) {
    xminutes < 10 ? (xminutes = `0${xminutes}`) : null;
    xseconds < 10 ? (xseconds = `0${xseconds}`) : null;

    let updatedTime =  `${xminutes}:${xseconds}`;

    timer.innerHTML = updatedTime;
    document.title =  main.getAttribute("data-status") + " - " +  updatedTime;
  }
}
function countDownStarter() {
  if (active == 0) {
    myTimer = setInterval(countDown, 1000);
    active = 1;
    buttonUpdate();
  } else {
    clearInterval(myTimer);
    active = 0;
    buttonUpdate();
  }
}

function buttonUpdate() {
  if (active == 0) {
    primary_button.innerHTML = "start";
    primary_button.dataset.running = "no";
  } else {
    primary_button.innerHTML = "stop";
    primary_button.dataset.running = "yes";
  }
}
function finished() {
  clearInterval(myTimer);
  bell.play();
  if (main.getAttribute("data-status") == "work") {
    setStatus("sbreak");
    countDownStarter();
  } else {
    setStatus("work");
  }
}
