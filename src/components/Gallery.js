import ImageCard from './ImageCard';

export default class Gallery {
  constructor(container) {
    this.container = container;
    this.cards = [];
  }

  addImage(name, url) {
    const card = new ImageCard(name, url, (deletedCard) => {
      this.removeCard(deletedCard);
    });

    this.cards.push(card);
    this.container.appendChild(card.getElement());
  }

  removeCard(cardToRemove) {
    const index = this.cards.findIndex(card => card === cardToRemove);
    if (index !== -1) {
      // Удаляем из массива
      this.cards.splice(index, 1);
      // Удаляем из DOM
      if (cardToRemove.element && cardToRemove.element.parentNode) {
        cardToRemove.element.remove();
      }
    }
  }

  getCardsCount() {
    return this.cards.length;
  }

  clear() {
    // Удаляем каждую карточку из DOM
    this.cards.forEach(card => {
      if (card.element && card.element.parentNode) {
        card.element.remove();
      }
    });
    // Очищаем массив
    this.cards = [];
  }
}
