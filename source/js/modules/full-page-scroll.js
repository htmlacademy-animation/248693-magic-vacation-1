import throttle from 'lodash/throttle';

const TIMEOUT = 800;
const TIMEOUT_SHORT = 200;
const HIDDEN_CLASS = `screen--hidden`;
const ACTIVE_CLASS = `active`;
const ANIMATED_CLASS = `animated`;

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.prevScreen = null;
    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.prevScreen = this.activeScreen;
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    document.body.setAttribute(`data-prev-screen`, this.screenElements[this.prevScreen].id);
    document.body.setAttribute(`data-active-screen`, this.screenElements[this.activeScreen].id);
    this.screenElements.forEach((screen) => {
      console.log(this.screenElements[this.prevScreen].id === screen.id);
      console.log(this.screenElements[this.activeScreen].id === screen.id);

      screen.classList.remove(ACTIVE_CLASS);
      screen.classList.add(ANIMATED_CLASS);
      setTimeout(() => {
        screen.classList.add(HIDDEN_CLASS);
        screen.classList.remove(ANIMATED_CLASS);
      }, this.screenElements[this.activeScreen].id === `prizes` ? TIMEOUT : TIMEOUT_SHORT);
    });

    setTimeout(() => {
      this.setActiveScreen();
    }, this.screenElements[this.activeScreen].id === `prizes` ? TIMEOUT : TIMEOUT_SHORT);
  }

  setActiveScreen() {
    this.screenElements[this.activeScreen].classList.remove(HIDDEN_CLASS);
    setTimeout(() => {
      if (this.screenElements[this.activeScreen].id === `story` && document.body.classList.value.search(/theme/) < 0) {
        document.body.classList.add(`theme-violet`);
      } else {
        const classes = document.body.classList.value.split(/\s/g).filter((className) => className.match(/theme/));
        document.body.classList.remove(...classes);
      }

      this.screenElements[this.activeScreen].classList.add(ACTIVE_CLASS);
    }, 100);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(ACTIVE_CLASS));
      activeItem.classList.add(ACTIVE_CLASS);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
