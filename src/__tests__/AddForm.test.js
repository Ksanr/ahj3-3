import AddForm from '../components/AddForm';
import { validateImageUrl } from '../utils/imageValidator';

jest.mock('../utils/imageValidator');

describe('AddForm', () => {
  let addForm;
  let nameInput;
  let urlInput;
  let button;
  let errorContainer;
  let onAddCallback;

  beforeEach(() => {
    nameInput = document.createElement('input');
    urlInput = document.createElement('input');
    button = document.createElement('button');
    errorContainer = document.createElement('div');
    onAddCallback = jest.fn();

    document.body.append(nameInput);
    document.body.append(urlInput);
    document.body.append(button);
    document.body.append(errorContainer);

    addForm = new AddForm(
      nameInput,
      urlInput,
      button,
      errorContainer,
      onAddCallback
    );
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  test('должен показывать ошибку при пустых полях', async () => {
    nameInput.value = '';
    urlInput.value = '';

    await addForm.handleAdd();

    expect(errorContainer.classList.contains('hidden')).toBe(false);
    expect(errorContainer.textContent).toBe('Заполните оба поля');
    expect(onAddCallback).not.toHaveBeenCalled();
  });

  test('должен показывать ошибку при пустом названии', async () => {
    nameInput.value = '';
    urlInput.value = 'https://example.com/image.jpg';

    await addForm.handleAdd();

    expect(errorContainer.classList.contains('hidden')).toBe(false);
    expect(errorContainer.textContent).toBe('Заполните оба поля');
    expect(onAddCallback).not.toHaveBeenCalled();
  });

  test('должен показывать ошибку при пустом URL', async () => {
    nameInput.value = 'Test';
    urlInput.value = '';

    await addForm.handleAdd();

    expect(errorContainer.classList.contains('hidden')).toBe(false);
    expect(errorContainer.textContent).toBe('Заполните оба поля');
    expect(onAddCallback).not.toHaveBeenCalled();
  });

  test('должен добавлять изображение при валидном URL', async () => {
    validateImageUrl.mockResolvedValue(true);

    nameInput.value = 'Valid Image';
    urlInput.value = 'https://via.placeholder.com/150';

    await addForm.handleAdd();

    expect(validateImageUrl).toHaveBeenCalledWith('https://via.placeholder.com/150');
    expect(onAddCallback).toHaveBeenCalledWith('Valid Image', 'https://via.placeholder.com/150');
    expect(nameInput.value).toBe('');
    expect(urlInput.value).toBe('');
    expect(errorContainer.classList.contains('hidden')).toBe(true);
  });

  test('не должен добавлять изображение при невалидном URL', async () => {
    validateImageUrl.mockRejectedValue(new Error('Неверный URL'));

    nameInput.value = 'Invalid Image';
    urlInput.value = 'https://invalid-url.com/image.jpg';

    await addForm.handleAdd();

    expect(validateImageUrl).toHaveBeenCalled();
    expect(onAddCallback).not.toHaveBeenCalled();
    expect(errorContainer.classList.contains('hidden')).toBe(false);
    expect(errorContainer.textContent).toBe('Неверный URL изображения');
  });

  test('должен очищать поля после успешного добавления', async () => {
    validateImageUrl.mockResolvedValue(true);

    nameInput.value = 'Test Image';
    urlInput.value = 'https://example.com/image.jpg';

    await addForm.handleAdd();

    expect(nameInput.value).toBe('');
    expect(urlInput.value).toBe('');
  });

  test('должен блокировать кнопку во время проверки', async () => {
    validateImageUrl.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    nameInput.value = 'Test';
    urlInput.value = 'https://example.com/image.jpg';

    const addPromise = addForm.handleAdd();

    expect(button.disabled).toBe(true);
    expect(button.textContent).toBe('Проверка...');

    await addPromise;

    expect(button.disabled).toBe(false);
    expect(button.textContent).toBe('Добавить');
  });

  test('должен показывать ошибку при очень длинном URL', async () => {
    // Мокаем validateImageUrl, чтобы он всегда отклонял очень длинные URL
    validateImageUrl.mockImplementation((url) => {
      if (url.length > 1000) {
        return Promise.reject(new Error('Неверный URL изображения'));
      }
      return Promise.resolve(true);
    });

    const longUrl = 'https://' + 'a'.repeat(10000) + '.com/image.jpg';
    nameInput.value = 'Test';
    urlInput.value = longUrl;

    await addForm.handleAdd();

    expect(errorContainer.classList.contains('hidden')).toBe(false);
    expect(errorContainer.textContent).toBe('Неверный URL изображения');
    expect(onAddCallback).not.toHaveBeenCalled();
  });

  test('должен очищать ошибку при вводе в поле URL', async () => {
    // Сначала вызываем ошибку
    validateImageUrl.mockRejectedValueOnce(new Error('Неверный URL'));

    nameInput.value = 'Test';
    urlInput.value = 'invalid-url';
    await addForm.handleAdd();
    expect(errorContainer.classList.contains('hidden')).toBe(false);
    expect(errorContainer.textContent).toBe('Неверный URL изображения');

    // Затем эмулируем ввод
    urlInput.dispatchEvent(new Event('input'));
    expect(errorContainer.classList.contains('hidden')).toBe(true);
    expect(errorContainer.textContent).toBe('');
  });

  test('должен показывать ошибку при пустом URL после трима', async () => {
    nameInput.value = 'Test';
    urlInput.value = '   ';

    await addForm.handleAdd();

    expect(errorContainer.classList.contains('hidden')).toBe(false);
    expect(errorContainer.textContent).toBe('Заполните оба поля');
    expect(onAddCallback).not.toHaveBeenCalled();
  });

  test('должен обрабатывать успешное добавление с моком', async () => {
    validateImageUrl.mockResolvedValue(true);

    nameInput.value = 'Valid Image';
    urlInput.value = 'https://valid-image.com/photo.jpg';

    await addForm.handleAdd();

    expect(validateImageUrl).toHaveBeenCalledWith('https://valid-image.com/photo.jpg');
    expect(onAddCallback).toHaveBeenCalledWith('Valid Image', 'https://valid-image.com/photo.jpg');
    expect(nameInput.value).toBe('');
    expect(urlInput.value).toBe('');
    expect(errorContainer.classList.contains('hidden')).toBe(true);
  });

  test('должен блокировать кнопку во время проверки', async () => {
    validateImageUrl.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    nameInput.value = 'Test';
    urlInput.value = 'https://example.com/image.jpg';

    const handleAddPromise = addForm.handleAdd();

    expect(button.disabled).toBe(true);
    expect(button.textContent).toBe('Проверка...');

    await handleAddPromise;

    expect(button.disabled).toBe(false);
    expect(button.textContent).toBe('Добавить');
  });
});
