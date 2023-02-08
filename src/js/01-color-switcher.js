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
  myAudioElement.play();
});

refs.stopBtn.addEventListener('click', () => {
  toggleBtns(refs.stopBtn, refs.startBtn);
  clearInterval(timerId);
  myAudioElement.pause();
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
const myAudioElement = document.querySelector('audio');
