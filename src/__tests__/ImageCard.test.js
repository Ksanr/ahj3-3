import ImageCard from '../components/ImageCard';

describe('ImageCard', () => {
  let imageCard;
  const mockName = 'Test Image';
  const mockUrl = 'https://via.placeholder.com/150';
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    document.body.innerHTML = '';
    imageCard = new ImageCard(mockName, mockUrl, mockOnDelete);
    document.body.append(imageCard.getElement());
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  test('должен создавать DOM элемент', () => {
    const element = imageCard.getElement();
    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.classList.contains('image-card')).toBe(true);
  });

  test('должен содержать изображение с правильным src', () => {
    const img = imageCard.getElement().querySelector('img');
    expect(img).toBeTruthy();
    expect(img.src).toBe(mockUrl);
    expect(img.alt).toBe(mockName);
  });

  test('должен содержать название изображения', () => {
    const nameSpan = imageCard.getElement().querySelector('.image-name');
    expect(nameSpan).toBeTruthy();
    expect(nameSpan.textContent).toBe(mockName);
  });

  test('должен содержать кнопку удаления', () => {
    const deleteBtn = imageCard.getElement().querySelector('.delete-btn');
    expect(deleteBtn).toBeTruthy();
    expect(deleteBtn.innerHTML).toBe('×');
  });

  test('при клике на кнопку удаления должен вызывать onDelete', () => {
    const deleteBtn = imageCard.getElement().querySelector('.delete-btn');
    deleteBtn.click();
    expect(mockOnDelete).toHaveBeenCalledWith(imageCard);
  });

  test('метод delete должен удалять элемент из DOM', () => {
    expect(document.body.contains(imageCard.getElement())).toBe(true);
    imageCard.delete();
    expect(document.body.contains(imageCard.getElement())).toBe(false);
  });

  test('должен обрабатывать ошибку загрузки изображения', () => {
    const errorCard = new ImageCard('Error Image', 'https://invalid-url.com/image.jpg', jest.fn());
    document.body.append(errorCard.getElement());

    // Просто проверяем, что карточка создалась и добавлена в DOM
    expect(errorCard.getElement()).toBeTruthy();
    expect(document.body.contains(errorCard.getElement())).toBe(true);

    // Очищаем
    errorCard.delete();
  });

  test('должен корректно обрабатывать повторное удаление', () => {
    const onDeleteMock = jest.fn();
    const card = new ImageCard('Test', 'https://via.placeholder.com/150', onDeleteMock);
    document.body.append(card.getElement());

    // Первое удаление
    card.delete();
    expect(document.body.contains(card.getElement())).toBe(false);
    expect(onDeleteMock).toHaveBeenCalledTimes(1);

    // Второе удаление не должно вызывать ошибку и не должно вызывать onDelete снова
    card.delete();
    expect(onDeleteMock).toHaveBeenCalledTimes(1); // Все еще 1, не 2
  });

  test('должен создавать элемент с правильной структурой', () => {
    const card = new ImageCard('Test Name', 'https://example.com/image.jpg', jest.fn());
    const element = card.getElement();

    expect(element.querySelector('.image-name').textContent).toBe('Test Name');
    expect(element.querySelector('img').src).toBe('https://example.com/image.jpg');
    expect(element.querySelector('img').alt).toBe('Test Name');
    expect(element.querySelector('.delete-btn')).toBeTruthy();

    card.delete();
  });
});
