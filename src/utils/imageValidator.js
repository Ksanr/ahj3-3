/**
 * Валидация URL изображения через загрузку
 * @param {string} url - URL изображения для проверки
 * @returns {Promise<boolean>} - Promise, который резолвится при успешной загрузке
 */

const TIMEOUT_INTERVAL_MS = 10000;

export function validateImageUrl(url) {
  return new Promise((resolve, reject) => {
    // Проверка на пустой URL
    if (!url || url.trim() === '') {
      reject(new Error('Неверный URL изображения'));
      return;
    }

    const img = new Image();
    let timeoutId;

    const cleanup = () => {
      if (timeoutId) clearTimeout(timeoutId);
      img.onload = null;
      img.onerror = null;
    };

    img.onload = () => {
      cleanup();
      resolve(true);
    };

    img.onerror = () => {
      cleanup();
      reject(new Error('Неверный URL изображения'));
    };

    timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error('Timeout загрузки изображения'));
    }, TIMEOUT_INTERVAL_MS);

    img.src = url;
  });
}
