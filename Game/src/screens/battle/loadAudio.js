function loadAudio(audiosrc) {
  const audio = new Audio();
  audio.src = audiosrc;
  return audio;
}

export default loadAudio;
