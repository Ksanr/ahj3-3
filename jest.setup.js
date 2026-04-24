// Мок для Image в тестовой среде
global.Image = class Image {
  constructor() {
    this.onload = null;
    this.onerror = null;
    this._src = '';
  }

  set src(url) {
    this._src = url;

    // Используем setImmediate для асинхронности, но с контролем
    if (url === 'https://via.placeholder.com/150') {
      // Успешная загрузка
      setTimeout(() => {
        if (this.onload) {
          this.onload();
        }
      }, 10);
    } else if (url === '') {
      // Пустой URL - сразу ошибка
      setTimeout(() => {
        if (this.onerror) {
          this.onerror(new Error('Invalid URL'));
        }
      }, 10);
    } else if (url) {
      // Невалидный URL - ошибка
      setTimeout(() => {
        if (this.onerror) {
          this.onerror(new Error('Failed to load image'));
        }
      }, 10);
    }
  }

  get src() {
    return this._src;
  }

  get complete() {
    return false;
  }
};
