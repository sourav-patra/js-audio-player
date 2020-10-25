const audioElement = document.getElementsByTagName("audio")[0];
const prevBtn = document.getElementById("previous");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const albumArt = document.getElementsByTagName("img")[0];
const audioTitle = document.getElementById("audio-title");
const artist = document.getElementById("artist");

const progressContainer = document.getElementById("progress-container");
const currentTimeElement = document.getElementById("current-time");
const durationElement = document.getElementById("duration");

// Music details
const songs = [{
  name: "jacinto-1",
  displayName: "Electric Chill Machine",
  artist: "Jacinto Design"
}, {
  name: "jacinto-2",
  displayName: "Seven Nation Army (Remix)",
  artist: "Jacinto Design"
}, {
  name: "jacinto-3",
  displayName: "Goodnight, Disco Queen",
  artist: "Jacinto Design"
}, {
  name: "metric-1",
  displayName: "Front Row (Remix)",
  artist: "Metric/Jacinto Design"
}]
let songIndex = 0;
let isMusicPlaying = false; // Check if music is playing

/**
 * Play the song
 */
function playSong() {
  isMusicPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute("title", "Pause");
  audioElement.play();
}

/**
 * Pause the song
 */
function pauseSong() {
  isMusicPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute("title", "Play");
  audioElement.pause();
}

/**
 * Update DOM for the concerned song selected
 */
function loadSong(song) {
  audioTitle.textContent = song.displayName;
  artist.textContent = song.artist;
  // Why use textContent instead of innerText ?
  /**
   * innerText takes CSS styles into account, reading the value of
   * innerText triggers a reflow to ensure up-to-date computed styles.
   * reflows can be computationally expensive, thus should be avoided when possible
   */
  audioElement.src = `music/${song.name}.mp3`;
  albumArt.src = `img/${song.name}.jpg`;
}

/**
 * Select previous song
 */
function selectPreviousSong() {
  if (songIndex === 0) {
    songIndex = songs.length;
  }
  songIndex --;
  loadSong(songs[songIndex]);
  playSong();
  
}

/**
 * Select next song
 */
function selectNextSong() {
  if (songIndex === songs.length - 1) {
    songIndex = -1;
  }
  songIndex++;
  loadSong(songs[songIndex]);
  playSong();
}


/**
 * Update progress bar of the audio track
 * and the duration/time
 */
function updateAudioProgress(event) {
  if (isMusicPlaying) {
    const { duration, currentTime } = event.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration * 100).toFixed(2);
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration and current time
    setAudioDurationOrCurrentTime(duration, durationElement);
    setAudioDurationOrCurrentTime(currentTime, currentTimeElement);
  }
}

/**
 * Find minutes and seconds when duration is given
 * @param {number} time
 * @param {HTMLElement} timeElement
 */
function setAudioDurationOrCurrentTime(time, timeElement) {
  const durationInMinutes = Math.floor(time / 60);
  let durationInSeconds = Math.floor(time % 60);
  if (durationInSeconds < 10) {
    durationInSeconds = `0${durationInSeconds}`
  }
  if (durationInSeconds) {
    timeElement.textContent = `${durationInMinutes}:${durationInSeconds}`
  }
}

/**
 * On Load - select first song
 */
loadSong(songs[songIndex]);

/**
 * Set Progres bar for audio
 */
function setProgressBarValue(event) {
  audioElement.currentTime = event.offsetX / this.clientWidth * audioElement.duration;
}

// Event Listeners
playBtn.addEventListener("click", () => isMusicPlaying ? pauseSong() : playSong());
prevBtn.addEventListener("click", selectPreviousSong);
nextBtn.addEventListener("click", selectNextSong);
audioElement.addEventListener("timeupdate", updateAudioProgress);
progressContainer.addEventListener("click", setProgressBarValue);
audioElement.addEventListener("ended", selectNextSong);