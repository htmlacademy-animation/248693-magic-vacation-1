export default class Countdown {
  constructor({element, countStart, countEnd, delay}) {
    this.element = element;
    this.countStart = Number(countStart);
    this.countEnd = Number(countEnd);
    this.count = Number(this.countStart);
    this.delay = delay;

    this.duration = 1000;
    this.fps = 12;
    this.fpsInterval = this.duration / this.fps;
    this.requestId = null;
    this.elapsed = null;

    this.increment = this.countEnd / (this.duration / this.fpsInterval);

    this.now = null;
    this.then = null;
  }

  startCountdown() {
    setTimeout(() => {
      this.then = Date.now();
      this.tick();
    }, this.delay);
  }

  endCountdown() {
    cancelAnimationFrame(this.requestId);
  }

  tick() {
    this.requestId = requestAnimationFrame(this.tick.bind(this));

    this.now = Date.now();
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);

      if (this.count < this.countEnd) {
        this.count = this.count + Math.ceil(this.increment);
        this.element.textContent = this.count < this.countEnd ? this.count : this.countEnd;
      } else {
        this.endCountdown();
      }
    }
  }
}
