export default class ImageCard {
  constructor(name, url, onDelete) {
    this.name = name;
    this.url = url;
    this.onDelete = onDelete;
    this.element = null;
    this.isDeleted = false;
    this.createCard();
  }

  createCard() {
    this.element = document.createElement('div');
    this.element.className = 'image-card';

    // Контейнер для изображения с относительным позиционированием
    const wrapper = document.createElement('div');
    wrapper.className = 'image-wrapper';

    // Создание изображения
    const img = document.createElement('img');
    img.src = this.url;
    img.alt = this.name;
    img.loading = 'lazy';

    // Кнопка удаления
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '×';
    deleteBtn.title = 'Удалить изображение';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.delete();
    });

    // Название изображения
    const nameDiv = document.createElement('div');
    nameDiv.className = 'image-name';
    nameDiv.textContent = this.name;

    // Сборка карточки
    wrapper.appendChild(img);
    wrapper.appendChild(deleteBtn);
    this.element.appendChild(wrapper);
    this.element.appendChild(nameDiv);
  }

  delete() {
    if (this.isDeleted) return;

    this.isDeleted = true;

    if (this.element && this.element.parentNode) {
      this.element.remove();
    }
    if (this.onDelete) {
      this.onDelete(this);
    }
  }

  getElement() {
    return this.element;
  }
}
