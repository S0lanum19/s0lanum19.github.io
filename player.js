document.addEventListener("DOMContentLoaded", function () {

  // ===== 1️⃣ Playlist =====
  var tracks = [
    { title: "1. OH MY GAAÆÆÆÆ", src: "audio/ohmygah.wav" },
    { title: "2. Polyoushka Polie", src: "audio/polioucka polie t4.wav" },
    { title: "3. Breakcore unfinished song", src: "audio/breakcore2 t2.wav" },
    { title: "4. ( ˶°ㅁ°) !!", src: "audio/BRKCR3.wav" },
    { title: "5. Staccato", src: "audio/5. Staccato.mp3" },
    { title: "6. Omori", src: "audio/6 - Omori - Omori.wav" },
    { title: "7. 1860", src: "audio/1860 Lofificator.wav" }
  ];

  var currentTrack = 0;

  // ===== 2️⃣ Elements =====
  var audio = document.getElementById("audio-player");
  var playBtn = document.getElementById("play");
  var nextBtn = document.getElementById("next");
  var prevBtn = document.getElementById("prev");
  var trackName = document.getElementById("track-name");
  var playlist = document.getElementById("playlist");

  var progressContainer = document.getElementById("progress-container");
  var progressBar = document.getElementById("progress-bar");
  var currentTimeEl = document.getElementById("current-time");
  var durationEl = document.getElementById("duration");

  // ===== 3️⃣ Fonctions utilitaires =====
  function loadTrack(index) {
    audio.src = tracks[index].src;
    trackName.innerHTML = tracks[index].title;
    audio.play();
    playBtn.innerHTML = "⏸";
  }

  function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var secs = Math.floor(seconds % 60);
    if (secs < 10) secs = "0" + secs;
    return minutes + ":" + secs;
  }

  // ===== 4️⃣ Boutons =====
  playBtn.onclick = function () {
    if (audio.paused) {
      audio.play();
      playBtn.innerHTML = "⏸";
    } else {
      audio.pause();
      playBtn.innerHTML = "▶";
    }
  };

  nextBtn.onclick = function () {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
  };

  prevBtn.onclick = function () {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
  };

  // ===== 5️⃣ Barre de progression =====
  audio.addEventListener("timeupdate", function () {
    if (!audio.duration) return;
    var percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + "%";
    currentTimeEl.innerHTML = formatTime(audio.currentTime);
  });

  audio.addEventListener("loadedmetadata", function () {
    durationEl.innerHTML = formatTime(audio.duration);
  });

  progressContainer.onclick = function (e) {
    var rect = progressContainer.getBoundingClientRect();
    var clickX = e.clientX - rect.left;
    var width = rect.width;
    var percent = clickX / width;
    audio.currentTime = percent * audio.duration;
  };

  // ===== 6️⃣ Génération de la playlist =====
  for (var i = 0; i < tracks.length; i++) {
    (function (index) {
      var li = document.createElement("li");
      li.innerHTML = tracks[index].title;

      li.onclick = function () {
        currentTrack = index;
        loadTrack(currentTrack);
      };

      playlist.appendChild(li);
    })(i);
  }

  // ===== 7️⃣ Démarrer le premier morceau =====
  loadTrack(currentTrack);

});
