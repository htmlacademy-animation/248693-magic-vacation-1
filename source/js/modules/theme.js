export const themeClass = {
  violet: `theme-violet`,
  blue: `theme-blue`,
  lightblue: `theme-lightblue`,
  darkviolet: `theme-darkviolet`,
};

export class Theme {
  constructor() {
    this._currentTheme = themeClass.violet;
    this._newTheme = null;
  }

  getTheme() {
    return this._currentTheme;
  }

  setTheme(theme) {
    this._newTheme = theme;

    document.body.classList.remove(this._currentTheme);
    document.body.classList.add(this._newTheme);

    this._currentTheme = this._newTheme;
  }

  resetTheme() {
    document.body.classList.remove(this._currentTheme);
    document.body.classList.remove(this._newTheme);

    this._currentTheme = undefined;
    this._newTheme = null;
  }
}
