import App from '../components/App';

describe('App', () => {
  let app;

  beforeEach(() => {
    // Создаем DOM элементы, которые нужны App
    document.body.innerHTML = `
      <div>
        <input id="imageName" />
        <input id="imageUrl" />
        <button id="addBtn"></button>
        <div id="errorMsg" class="hidden"></div>
        <div id="gallery"></div>
      </div>
    `;

    app = new App();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('должен создавать экземпляр App', () => {
    expect(app).toBeInstanceOf(App);
    expect(app.gallery).toBeDefined();
    expect(app.addForm).toBeDefined();
  });

  test('должен инициализировать DOM элементы', () => {
    expect(app.galleryContainer).toBeDefined();
    expect(app.nameInput).toBeDefined();
    expect(app.urlInput).toBeDefined();
    expect(app.addButton).toBeDefined();
    expect(app.errorContainer).toBeDefined();
  });
});
