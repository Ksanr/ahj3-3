import Gallery from '../components/Gallery';

describe('Gallery', () => {
  let gallery;
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    gallery = new Gallery(container);
    document.body.append(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  test('должен создаваться с пустым контейнером', () => {
    expect(gallery.getCardsCount()).toBe(0);
    expect(container.children.length).toBe(0);
  });

  test('должен добавлять изображение', (done) => {
    gallery.addImage('Test', 'https://via.placeholder.com/150');

    // Небольшая задержка для создания DOM элементов
    setTimeout(() => {
      expect(gallery.getCardsCount()).toBe(1);
      expect(container.children.length).toBe(1);
      done();
    }, 100);
  });

  test('должен добавлять несколько изображений', (done) => {
    gallery.addImage('Test1', 'https://via.placeholder.com/150');
    gallery.addImage('Test2', 'https://via.placeholder.com/150');
    gallery.addImage('Test3', 'https://via.placeholder.com/150');

    setTimeout(() => {
      expect(gallery.getCardsCount()).toBe(3);
      expect(container.children.length).toBe(3);
      done();
    }, 100);
  });

  test('должен удалять изображение', (done) => {
    gallery.addImage('Test1', 'https://via.placeholder.com/150');
    gallery.addImage('Test2', 'https://via.placeholder.com/150');

    setTimeout(() => {
      expect(gallery.getCardsCount()).toBe(2);
      expect(container.children.length).toBe(2);

      // Удаляем первую карточку
      const cardToRemove = gallery.cards[0];
      gallery.removeCard(cardToRemove);

      expect(gallery.getCardsCount()).toBe(1);
      expect(container.children.length).toBe(1);
      done();
    }, 100);
  });

  test('метод clear должен удалять все изображения', (done) => {
    gallery.addImage('Test1', 'https://via.placeholder.com/150');
    gallery.addImage('Test2', 'https://via.placeholder.com/150');

    setTimeout(() => {
      expect(gallery.getCardsCount()).toBe(2);
      expect(container.children.length).toBe(2);

      gallery.clear();

      expect(gallery.getCardsCount()).toBe(0);
      expect(container.children.length).toBe(0);
      done();
    }, 100);
  });

  test('должен корректно обрабатывать удаление несуществующей карточки', () => {
    // Создаем фейковую карточку, которой нет в галерее
    const fakeCard = { element: document.createElement('div') };

    expect(() => {
      gallery.removeCard(fakeCard);
    }).not.toThrow();

    expect(gallery.getCardsCount()).toBe(0);
  });

  test('должен удалять карточку, даже если она не в DOM', () => {
    gallery.addImage('Test1', 'https://via.placeholder.com/150');

    const card = gallery.cards[0];
    // Удаляем элемент из DOM вручную
    if (card.element && card.element.parentNode) {
      card.element.remove();
    }

    // Удаление не должно вызвать ошибку
    expect(() => {
      gallery.removeCard(card);
    }).not.toThrow();

    expect(gallery.getCardsCount()).toBe(0);
  });
});
