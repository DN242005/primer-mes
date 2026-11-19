const container = document.querySelector(".floating-hearts");
const envelope = document.querySelector(".envelope");
const card = document.querySelector(".card");

envelope.addEventListener("click", () => {
  envelope.classList.add("is-opening");

  window.setTimeout(() => {
    envelope.classList.add("is-open");
    card.classList.add("is-visible");
    card.setAttribute("aria-hidden", "false");
  }, 850);

  window.setTimeout(() => {
    envelope.hidden = true;
  }, 1450);
});

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = "✦";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 22}px`;
  heart.style.animationDuration = `${5 + Math.random() * 5}s`;
  heart.style.opacity = `${0.35 + Math.random() * 0.45}`;
  container.appendChild(heart);

  heart.addEventListener("animationend", () => heart.remove());
}

setInterval(createHeart, 650);

const musicAudio = document.querySelector("#music-audio");
const musicToggle = document.querySelector("#music-toggle");
const musicToggleIcon = document.querySelector("#music-toggle-icon");
const musicStatus = document.querySelector("#music-status");
let musicPlaying = false;

musicToggle.addEventListener("click", async () => {
  if (musicAudio.paused) {
    try {
      await musicAudio.play();
    } catch (error) {
      musicStatus.textContent = "No se pudo reproducir";
      console.error(error);
    }
  } else {
    musicAudio.pause();
  }
});

musicAudio.addEventListener("play", () => {
  musicPlaying = true;
  musicStatus.textContent = "Reproduciendo";
  musicToggleIcon.textContent = "Ⅱ";
});

musicAudio.addEventListener("pause", () => {
  musicPlaying = false;
  musicStatus.textContent = "Pausado";
  musicToggleIcon.textContent = "▶";
});

musicAudio.addEventListener("ended", () => {
  musicStatus.textContent = "Terminó la canción";
  musicToggleIcon.textContent = "▶";
});

const musicProgress = document.querySelector("#music-progress");

musicProgress.addEventListener("input", () => {
  const seconds = Number(musicProgress.value);
  document.querySelector("#music-current").textContent = formatMusicTime(seconds);
  musicAudio.currentTime = seconds;
});

function formatMusicTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

musicAudio.addEventListener("loadedmetadata", () => {
  const duration = Math.floor(musicAudio.duration);
  musicProgress.max = String(duration);
  document.querySelector(".music-times span:last-child").textContent = formatMusicTime(duration);
  if (!musicProgress.value) musicProgress.value = "0";
});

musicAudio.addEventListener("timeupdate", () => {
  const duration = musicAudio.duration || 143;
  const current = musicAudio.currentTime;
  musicProgress.value = String(Math.round(current));
  document.querySelector("#music-current").textContent = formatMusicTime(current);
  const percentage = (current / duration) * 100;
  musicProgress.style.background =
    `linear-gradient(90deg, var(--acid) 0 ${percentage}%, rgba(241, 243, 237, 0.9) ${percentage}%`;
});

document.querySelector("#music-heart").addEventListener("click", (event) => {
  event.currentTarget.classList.toggle("is-liked");
  event.currentTarget.style.color = event.currentTarget.classList.contains("is-liked")
    ? "#ff6688"
    : "var(--acid)";
});

document.querySelector("#music-repeat").addEventListener("click", (event) => {
  event.currentTarget.classList.toggle("is-active");
  musicAudio.loop = event.currentTarget.classList.contains("is-active");
});

document.querySelector("#music-back").addEventListener("click", () => {
  musicAudio.currentTime = Math.max(0, musicAudio.currentTime - 10);
});

document.querySelector("#music-forward").addEventListener("click", () => {
  musicAudio.currentTime = Math.min(musicAudio.duration || 143, musicAudio.currentTime + 10);
});
