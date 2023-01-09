let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_track = document.querySelector(".next-track");
let prev_track = document.querySelector(".prev-track");

let seek = document.querySelector(".seek");
let volume = document.querySelector(".volume");

let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let wave = document.querySelector(".wave");

let randomicon = document.querySelector(".fa-random");

let curr_track = document.createElement('audio');
let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    img: "img/songs/laylow.jpg",
    name: "Lay Low",
    artist: "Tiesto",
    music: "music/tiesto_lay-low.mp3",
  },
  {
    img: "img/songs/imgood.jpg",
    name: "I`m Good (Blue)",
    artist: "David Guetta, Bebe Rexha",
    music: "music/david-guetta_im-good.mp3",
  },
  {
    img: "img/songs/lullaby.jpg",
    name: "Lullaby",
    artist: "R3hab, Mike Williams",
    music: "music/r3hab-mikewilliams_lullaby.mp3",
  },
  {
    img: "img/songs/heroestonight.jpg",
    name: "Heroes Tonight",
    artist: "Janji, Johnning",
    music: "music/janji-johnning_heroes-tonight.mp3",
  }
];

loadTrack(track_index);

function loadTrack(track_index){
	clearInterval(updateTimer);
	reset();
	curr_track.src = music_list[track_index].music;
	curr_track.load();
	track_art.style.backgroundImage = 'url(../' + music_list[track_index].img + ')';
	track_name.textContent = music_list[track_index].name;
	track_artist.textContent = music_list[track_index].artist;
	now_playing.textContent = 'Playing music ' + (track_index + 1) + ' of ' + music_list.length;
	updateTimer = setInterval(setUpdate, 1000);
	curr_track.addEventListener('ended', nextTrack);
	random_bg_color();
}

function random_bg_color() {
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];
  let a;

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }
  let Color1 = populate("#");
  let Color2 = populate("#");
  var angle = "to right";

  let gradient =
    "linear-gradient(" + angle + "," + Color1 + ", " + Color2 + ")";
  document.body.style.background = gradient;
}

function reset(){
	curr_time.textContent = '00:00';
	total_duration.textContent = '00:00';
	seek.value = 0;
}

function randomTrack(){
	isRandom ? pauseRandom() : playRandom();
}

function playRandom(){
	isRandom = true;
  randomIcon.classList.add('.randomActive');
}

function pauseRandom(){
  isRandom = false;
  randomIcon.classList.remove('.randomActive');
}

function repeatTrack(){
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}

function playpauseTrack(){
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack(){
  curr_track.play();
  isPlaying = true;
  track_art.classList.add('rotate');
  wave.classList.add('loader');
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack(){
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove('rotate');
  wave.classList.remove('loader');
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack(){
  if(track_index < music_list.length - 1 && isRandom === false){
    track_index += 1;
  } else if(track_index < music_list.length - 1 && isRandom === true){
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else{
    track_index = 0;
  }

  loadTrack(track_index);
  playTrack();
}

function prevTrack(){
  if(track_index > 0){
    track_index -= 1;
  } else{
    track_index = music_list.length - 1;
  }

  loadTrack(track_index);
  playTrack();
}

function seekTo(){
  let seekto = curr_track.duration * (seek.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume(){
  curr_track.volume = volume.value / 100;
}

function setUpdate(){
  let seekPosition = 0;
  if(!isNaN(curr_track.duration)){
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek.value = seekPosition;

    let currentMin = Math.floor(curr_track.currentTime / 60);
    let currentSec = Math.floor(curr_track.currentTime - currentMin * 60);
    let durationMin = Math.floor(curr_track.duration / 60);
    let durationSec = Math.floor(curr_track.duration - durationMin * 60);

    if(currentSec < 10){
      currentSec = '0' + currentSec;
    }
    if(durationSec < 10){
      durationSec = '0' + durationSec;
    }
    if(currentMin < 10){
      currentMin = '0' + currentMin;
    }
    if(durationMin < 10){
      durationMin = '0' + durationMin;
    }

    curr_time.textContent = currentMin + ':' + currentSec;
    total_duration.textContent = durationMin + ':' + durationSec;
  }
}