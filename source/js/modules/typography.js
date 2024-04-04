const MIN_NUMBER = 100;
const MAX_NUMBER = 300;

export default class Typography {
  constructor(element, delay) {
    this._element = element;
    this._delay = delay;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  createElement(letter) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    span.setAttribute(`style`, `--delay: ${this._delay ?
      this._delay + this.getRandomNumber(MIN_NUMBER, MAX_NUMBER) :
      this.getRandomNumber(MIN_NUMBER, MAX_NUMBER)}ms`);
    return span;
  }

  prepareText() {
    if (!this._element) {
      return;
    }
    const text = this._element.textContent.trim().split(/\s/g).filter((latter) => latter !== ``);

    const content = text.reduce((fragmentWord, word) => {
      const letterContainer = word.split(``).reduce((fragmentLetter, letter) => {
        fragmentLetter.append(this.createElement(letter));
        return fragmentLetter;
      }, document.createDocumentFragment());

      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`typography-word`);
      wordContainer.appendChild(letterContainer);
      fragmentWord.appendChild(wordContainer);
      return fragmentWord;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  init() {
    this._element.classList.add(`typography`);
    this.prepareText();
  }
}
