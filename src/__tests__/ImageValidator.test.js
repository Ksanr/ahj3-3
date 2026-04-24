import { validateImageUrl } from '../utils/imageValidator';

describe('validateImageUrl', () => {
  test('должен резолвиться для валидного URL изображения', async () => {
    const validUrl = 'https://via.placeholder.com/150';
    const result = await validateImageUrl(validUrl);
    expect(result).toBe(true);
  }, 10000); // Увеличиваем таймаут до 10 секунд

  test('должен отклоняться для невалидного URL', async () => {
    const invalidUrl = 'https://invalid-url.com/image.jpg';
    await expect(validateImageUrl(invalidUrl)).rejects.toThrow();
  }, 10000);

  test('должен отклоняться для пустого URL', async () => {
    // Пустой URL должен вызывать ошибку сразу
    await expect(validateImageUrl('')).rejects.toThrow();
  }, 10000);

  test('должен отклоняться при таймауте загрузки', async () => {
    // Создаем специальный мок для теста таймаута
    const originalImage = global.Image;

    global.Image = class Image {
      constructor() {
        this.onload = null;
        this.onerror = null;
        this.src = '';
      }

      set src(url) {
        this._src = url;
        // Ничего не делаем - эмулируем зависание
      }

      get src() {
        return this._src;
      }
    };

    const slowUrl = 'https://very-slow-server.com/image.jpg';

    // Уменьшаем таймаут для теста
    await expect(validateImageUrl(slowUrl)).rejects.toThrow('Timeout загрузки изображения');

    global.Image = originalImage;
  }, 15000);

  test('должен обрабатывать некорректные протоколы', async () => {
    const invalidProtocolUrl = 'ftp://invalid-protocol.com/image.jpg';
    await expect(validateImageUrl(invalidProtocolUrl)).rejects.toThrow('Неверный URL изображения');
  });

  test('должен обрабатывать URL с спецсимволами', async () => {
    const specialCharsUrl = 'https://example.com/image with spaces.jpg';
    await expect(validateImageUrl(specialCharsUrl)).rejects.toThrow();
  });
});
