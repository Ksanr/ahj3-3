# Галерея изображений с проверкой URL

[![Build and Deploy](https://github.com/ksanr/ahj3-3/actions/workflows/deploy.yml/badge.svg)](https://github.com/ksanr/ahj3-3/actions/workflows/deploy.yml)

Менеджер изображений с валидацией URL через фактическую загрузку изображения.

## Функциональность

- Добавление изображений по названию и URL
- Добавление как по кнопке, так и по клавише Enter
- Проверка валидности URL через загрузку изображения
- Отображение ошибки при неверном URL
- Удаление изображений из галереи
- Адаптивный дизайн

## Технологии

- JavaScript (ES6+)
- Webpack
- Babel
- Jest (тестирование)
- ESLint + Prettier (линтинг)
- GitHub Actions (CI/CD)
- GitHub Pages (хостинг)

## Демонстрация работы

[GitHub Pages](https://ksanr.github.io/ahj3-3/)

## Установка и запуск

```bash
yarn install      # установка зависимостей
yarn start        # запуск dev сервера
yarn build        # сборка проекта
yarn test         # запуск тестов
yarn coverage     # проверка покрытия
yarn lint         # проверка кода
yarn deploy       # Деплой на GitHub Pages
