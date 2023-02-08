import '../css/common.css';

const body = document.querySelector('body');

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.stopBtn.disabled = true;
let timerId = null;
const TIMEINTERVAL = 1000;

refs.startBtn.addEventListener('click', () => {
  toggleBtns(refs.stopBtn, refs.startBtn);
  switchBobyBgColor(TIMEINTERVAL);
});

refs.stopBtn.addEventListener('click', () => {
  toggleBtns(refs.stopBtn, refs.startBtn);
  clearInterval(timerId);
});

function toggleBtns(...buttons) {
  buttons.forEach(button =>
    button.disabled ? (button.disabled = false) : (button.disabled = true)
  );
}

function switchBobyBgColor(TIMEINTERVAL) {
  body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, TIMEINTERVAL);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function playMusic() {
  const audio = new Audio(
    '/Psychedelic Universe Original Mix ! Psychedelic Universe.mp3'
  );
  audio.play();
}

refs.startBtn.addEventListener('click', playMusic);
