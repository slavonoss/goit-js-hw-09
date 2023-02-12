//imports
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//get controls
let userChosenTime = null;

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]'),
  myAudioElement: document.querySelector('[data-success]'),
  myAudioElementError: document.querySelector('[data-error]'),
};

refs.startBtn.addEventListener('click', startCountdown);
refs.startBtn.disabled = true;
const flatPicker = flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkFutureDate(selectedDates[0]);
  },
});

function startCountdown() {
  //show once on click startBtn
  const currentTime = new Date();
  const timeDelta = userChosenTime.getTime() - currentTime.getTime();
  setClockFace(convertMs(timeDelta));

  const intervalId = setInterval(() => {
    //show per interval
    const currentTime = new Date();
    const timeDelta = userChosenTime.getTime() - currentTime.getTime();
    setClockFace(convertMs(timeDelta));

    //stop interval on timeout
    if (timeDelta < 1000) {
      clearInterval(intervalId);
      console.log('time is out');
      Notify.failure('time is out', {
        timeout: 2000,
        showOnlyTheLastOne: true,
        position: 'center-top',
      });
    }
  }, 1000);
  refs.myAudioElement.play();
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function setClockFace(timeObj) {
  refs.days.textContent = addLeadingZero(timeObj.days);
  refs.hours.textContent = addLeadingZero(timeObj.hours);
  refs.minutes.textContent = addLeadingZero(timeObj.minutes);
  refs.seconds.textContent = addLeadingZero(timeObj.seconds);
}
function checkFutureDate(userTime) {
  const currentTime = new Date();
  userChosenTime = userTime;
  const timeDelta = userChosenTime.getTime() - currentTime.getTime();

  if (timeDelta < 0) {
    Notify.failure('Please choose a date in future', {
      timeout: 2000,
      showOnlyTheLastOne: true,
      position: 'center-top',
    });
    refs.startBtn.disabled = true;
    refs.myAudioElementError.play();

    return;
  }
  refs.startBtn.disabled = false;
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
