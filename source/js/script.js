const DELAY = 600;

// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import Typography from "./modules/typography";

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();

window.addEventListener(`load`, function () {
  document.body.classList.add(`loaded`);

  const fullPageScroll = new FullPageScroll();
  fullPageScroll.init();

  if (document.querySelector(`[data-typography]`)) {
    document.querySelectorAll(`[data-typography]`).forEach((element) => {
      if (element.classList.contains(`intro__date`)) {
        const typographyElement = new Typography(element, DELAY);
        typographyElement.init();
      } else {
        const typographyElement = new Typography(element);
        typographyElement.init();
      }
    });
  }

  if (document.querySelector(`.result__title`)) {
    const pathElements = document.querySelectorAll(`.result__title path`);
    pathElements.forEach((element) => {
      element.setAttribute(`style`, `--path-length: ${element.getTotalLength()}`);
    });
  }
});
