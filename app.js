const audio = document.getElementById("audio");
const back = document.getElementById("back");
const play = document.getElementById("play");
const next = document.getElementById("next");
const Anthemeimg = document.getElementById("Anthemeimg");
const music = document.getElementById("music");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const curr = document.getElementById("current");
const durat = document.getElementById("duration");
const progressContainer = document.getElementById("progress-container");

const directory = [
  {
    anthem: "Jack",
    name: "track 1",
    audio: "play-1",
    img: "img-1",
  },
  {
    anthem: "Harry",
    name: "track 2",
    audio: "play-2",
    img: "img-2",
  },
  {
    anthem: "Jhon",
    name: "track 3",
    audio: "play-3",
    img: "img-3",
  },
];

let isPlaying = false;
function Play() {
  audio.play(); //audio event play , pause
  isPlaying = true;
  play.classList.replace("fa-play", "fa-pause");
}
function Pause() {
  audio.pause();
  isPlaying = false;
  play.classList.replace("fa-pause", "fa-play");
}
play.addEventListener("click", () => {
  isPlaying ? Pause() : Play();
});

function onLoad(song) {
  //get new song using array
  music.textContent = song.anthem ? `${song.anthem}` : "unKnown";
  artist.textContent = song.name ? `${song.name}` : "unKnown";
  Anthemeimg.src = `/Images/${song.img}.jpg`;
  audio.src = `/Anthem directory/${song.audio}.mp3`;
  console.log(Anthemeimg.src);
}

let songIndex = 0;
function Next() {
  songIndex++; // songIndex increase when next fun is call;
  if (songIndex > directory.length - 1) {
    songIndex = 0; // if song index greater then song directory lenght its will be 0
  }
  onLoad(directory[songIndex]); // songindex increase inside this fun that why pass parameter from here
  Play(); //run after reach another song
}

function Prev() {
  songIndex--; // songindex decrease onclick
  if (songIndex < 0) {
    songIndex = directory.length - 1; //if sI 0 user reach another song by clicking
  }
  onLoad(directory[songIndex]);
  Play();
}

function prgressReport(events) {
  if (isPlaying) {
    // if playing then we enter this statement
    const { currentTime, duration } = events.srcElement; //audio attribute to get currT , dura    //object destructring;
    const time = (currentTime / duration) * 100;
    progress.style.width = `${time}%`; // this is the reach level of progress bar %

    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);

    if (durationMinutes) {
      if (durationSeconds < 10) {
        durat.textContent = `${durationMinutes}:0${durationSeconds}`;
      }
    }

    const currentMinute = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    curr.textContent = `${currentMinute}:${currentSeconds}`;
  }
}

function setProgress(e) {
  let width = this.clientWidth;
  let currentLocation = e.offsetX;
  const { duration } = audio;

  audio.currentTime = (currentLocation / width) * duration;
}

audio.addEventListener("timeupdate", prgressReport);
next.addEventListener("click", Next);
audio.addEventListener("ended", Next);
back.addEventListener("click", Prev);
progressContainer.addEventListener("click", setProgress);
