const musicContainerEl = document.getElementById("music-container");
const progressContainerEl = document.getElementById("progress-container");
const progressBar = document.getElementById("progress");

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const image = document.getElementById("cover");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

//Song titles in order
const songs = [
  "Dance Monkey",
  "Death Bed",
  "Demons",
  "Happier",
  "I Hate You, I Love You",
  "I Love You 3000",
  "Little Do You Know",
];

//Keep track of song
let songIndex = 5;

//Load song details to DOM
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  image.src = `img/${song}.png`;
}

loadSong(songs[songIndex]);

//Play song
function playSong() {
  musicContainerEl.classList.add("play");

  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

//Pause song
function pauseSong() {
  musicContainerEl.classList.remove("play");

  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

//Play previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

//Play next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

//Update progress bar
function updateProgressBar(e) {
  const { duration, currentTime } = e.srcElement;

  const progressPercentage = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

//Set progress bar
function setProgressBar(e) {
  const width = this.clientWidth; //Total duration of song
  const clickX = e.offsetX; //The position where you click

  audio.currentTime = (clickX / width) * audio.duration;
}

//Add event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainerEl.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgressBar);
progressContainerEl.addEventListener("click", setProgressBar);
audio.addEventListener("ended", nextSong);
