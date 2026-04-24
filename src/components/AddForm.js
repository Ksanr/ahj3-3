import { validateImageUrl } from '../utils/imageValidator';

export default class AddForm {
  constructor(nameInput, urlInput, button, errorContainer, onAddCallback) {
    this.nameInput = nameInput;
    this.urlInput = urlInput;
    this.button = button;
    this.errorContainer = errorContainer;
    this.onAddCallback = onAddCallback;

    this.initEventListeners();
  }

  initEventListeners() {
    // Обработчик кнопки
    this.button.addEventListener('click', () => this.handleAdd());

    // Обработчик Enter на поле названия
    this.nameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleAdd();
      }
    });

    // Обработчик Enter на поле URL
    this.urlInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleAdd();
      }
    });

    // Очистка ошибки при вводе
    this.urlInput.addEventListener('input', () => {
      this.hideError();
    });
  }

  async handleAdd() {
    const name = this.nameInput.value.trim();
    const url = this.urlInput.value.trim();

    // Валидация наличия данных
    if (!name || !url) {
      this.showError('Заполните оба поля');
      return;
    }

    // Блокируем кнопку на время проверки
    this.button.disabled = true;
    this.button.textContent = 'Проверка...';

    try {
      // Проверка URL через загрузку изображения
      await validateImageUrl(url);

      // Если успешно - добавляем изображение
      this.onAddCallback(name, url);
      this.clearInputs();
      this.hideError();
    } catch {
      this.showError('Неверный URL изображения');
    } finally {
      // Разблокируем кнопку
      this.button.disabled = false;
      this.button.textContent = 'Добавить';
    }
  }

  showError(message) {
    this.errorContainer.textContent = message;
    this.errorContainer.classList.remove('hidden');
  }

  hideError() {
    this.errorContainer.classList.add('hidden');
    this.errorContainer.textContent = '';
  }

  clearInputs() {
    this.nameInput.value = '';
    this.urlInput.value = '';
    this.nameInput.focus();
  }
}
