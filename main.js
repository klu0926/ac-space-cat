// 找node
const container = document.querySelector("#container");
const title = document.querySelector("#title");
const image = document.querySelector("#myImage");
const background = document.querySelector("body");
const scoreDisplay = document.querySelector("#score");
const optionBtn = document.querySelector("#option-btn");
const muteBtn = document.querySelector("#mute-btn");
const inputFrom = document.querySelector("#input-from");
const closeBtn = document.querySelector("#close-btn");
const sendBtn = document.querySelector("#send-btn");

// 初始變數
// Images
let image1URL = "https://popcat.click/img/p.1e9d00be.png";
let image2URL = "https://popcat.click/img/op.353767c3.png";
// Sound
let audioURL = "https://www.myinstants.com/media/sounds/meow2.mp3";
let audio = new Audio(audioURL);
let isAudio = false;
// Background music
// 無法直接播放音樂，需要放在一個eventListener裡面使用，原因不明
let musicURL = "https://www.myinstants.com/media/sounds/nyan-cat_1.mp3";
let BGM = new Audio(musicURL);
BGM.volume = 0.5;
BGM.loop = true;

// Score
let score = 0;
// increase score
function increaseScore() {
  score++;
}

// Start
displayScore();

// Display
function displayScore() {
  scoreDisplay.textContent = score;
}

function changeBackground(image, url) {
  image.style.backgroundImage = `url(${url})`;
}

function rotateScoreText() {
  const min = -20;
  const max = 20;
  // rotate + pop score text
  const randomDegree = Math.floor(Math.random() * (max - min)) + min;
  scoreDisplay.style.transform = `rotate(${randomDegree}deg)`;
  scoreDisplay.classList.toggle("pop-score");
  scoreDisplay.classList.remove("animated-text");

  // back to normal
  setTimeout(() => {
    scoreDisplay.style.transform = `rotate(0deg)`;
    scoreDisplay.classList.toggle("pop-score");
    scoreDisplay.classList.add("animated-text");
  }, 50);
}

// CONTROL
// mouse down
window.addEventListener("mousedown", clickFunction);
optionBtn.addEventListener("click", optionButtonClick);
closeBtn.addEventListener("click", closeButtonClick);
sendBtn.addEventListener("click", sendButtonClick);
muteBtn.addEventListener("click", muteButtonClick);

// space bar down
window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    changeBackground(image, image2URL);
    increaseScore();
    displayScore();
    rotateScoreText();
    if (isAudio) {
      audio.currentTime = 0;
      audio.play();
      BGM.play();
    }
  }
});

// spacebar up
window.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    changeBackground(image, image1URL);
  }
});

// mouse up
container.addEventListener("mouseup", (event) => {
  changeBackground(image, image1URL);
});

// click container function
function clickFunction(event) {
  if ([container, image, title, scoreDisplay].includes(event.target)) {
    changeBackground(image, image2URL);
    increaseScore();
    displayScore();
    rotateScoreText();
    if (isAudio) {
      audio.currentTime = 0;
      audio.play();
      BGM.play();
    }
  }
}

// BUTTONS
// option
function optionButtonClick(event) {
  inputFrom.classList.toggle("display-none");
  if (optionBtn.classList.contains("btn-danger")) {
    optionBtn.classList.remove("btn-danger");
    optionBtn.classList.add("btn-dark");
    // remove container listener
    container.removeEventListener("mousedown", clickFunction);
  } else {
    optionBtn.classList.add("btn-danger");
    optionBtn.classList.remove("btn-dark");
    // add container listener
    container.addEventListener("mousedown", clickFunction);
  }
}
// close
function closeButtonClick(event) {
  inputFrom.classList.toggle("display-none");
  optionBtn.classList.add("btn-danger");
  optionBtn.classList.remove("btn-dark");
  // add container listener
  container.addEventListener("mousedown", clickFunction);
}
// send
function sendButtonClick(event) {
  const titleInput = document.querySelector("#title-input");
  const url1 = document.querySelector("#image-input-one");
  const url2 = document.querySelector("#image-input-two");
  const backgounrdUrl = document.querySelector("#background-input");
  const soundUrl = document.querySelector("#sound-input");
  const bgmUrl = document.querySelector("#bgm-input");

  //title
  if (titleInput.value !== "") {
    title.textContent = titleInput.value;
    titleInput.value = "";
  }
  //image1
  if (url1.value !== "") {
    image1URL = url1.value;
    url1.value = "";
  }
  //image2
  if (url2.value !== "") {
    image2URL = url2.value;
    url2.value = "";
  }
  //background
  if (backgounrdUrl.value) {
    changeBackground(background, backgounrdUrl.value);
    backgounrdUrl.value = "";
  }
  //sound
  if (soundUrl.value) {
    audio.pause();
    audio = new Audio(soundUrl.value);
    soundUrl.value = "";
  }
  //BGM
  if (bgmUrl.value) {
    BGM.pause();
    BGM = new Audio(bgmUrl.value);
    BGM.loop = true;
    BGM.play();
    bgmUrl.value = "";
  }
}

// mute
function muteButtonClick(event) {
  const valumeIcon = document.querySelector("#valume-icon");
  if (isAudio) {
    isAudio = false;
    BGM.pause();
    valumeIcon.classList.remove("fa-volume-high");
    valumeIcon.classList.add("fa-volume-xmark");
  } else {
    isAudio = true;
    BGM.play();
    valumeIcon.classList.add("fa-volume-high");
    valumeIcon.classList.remove("fa-volume-xmark");
  }
}

console.log("all working well");

//音樂
// 原始epic
//https://cdn.pixabay.com/download/audio/2022/12/19/audio_855791f068.mp3?filename=tech-house-vibe-kit-129919.mp3
// 喵喵喵
//https://www.myinstants.com/media/sounds/nyan-cat_1.mp3

//背景
// 原始宇宙
// https://media.giphy.com/media/l3c614V12UA82q1vG/giphy.gif
//https://media.giphy.com/media/BQRRM0T4C0MXZixwiu/giphy.gif
