export default class Timer {
  constructor({container}) {
    this.container = container;
    this.timerMinutesElement = container.querySelector(`span:nth-child(1)`);
    this.timerSecondsElement = container.querySelector(`span:nth-child(2)`);
    this.duration = container.dataset.duration * 60 * 1000;
    this.fpsInterval = 1000;
    this.requestId = null;
    this.elapsed = null;

    this.now = null;
    this.then = null;
    this.endDate = null;
  }

  startTimer() {
    this.then = Date.now();
    this.endDate = new Date(this.then + this.duration).getTime();

    this.updateTime({
      minutes: this.container.dataset.duration,
      seconds: 0
    });

    this.requestId = requestAnimationFrame(this.tick.bind(this));
  }

  resetTimer() {
    this.updateTime({
      minutes: 0,
      seconds: 0
    });

    cancelAnimationFrame(this.requestId);
  }

  tick() {
    this.requestId = requestAnimationFrame(this.tick.bind(this));

    this.now = Date.now();
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);
      const difference = this.endDate - this.then;

      if (difference > 0) {
        let seconds = Math.floor(difference / 1000);
        let minutes = Math.floor(seconds / 60);

        this.updateTime({
          minutes: minutes % 60,
          seconds: seconds % 60
        });
      } else {
        this.updateTime({
          minutes: 0,
          seconds: 0
        });

        this.resetTimer();
      }
    }
  }

  updateTime({minutes, seconds}) {
    const formattedMinutes = Number(minutes) > 9 ? `${minutes}` : `0${minutes}`;
    const formattedSeconds = Number(seconds) > 9 ? `${seconds}` : `0${seconds}`;

    if (this.timerMinutesElement.textContent !== formattedMinutes) {
      this.timerMinutesElement.textContent = formattedMinutes;
    }

    if (this.timerSecondsElement.textContent !== formattedSeconds) {
      this.timerSecondsElement.textContent = formattedSeconds;
    }
  }
}
