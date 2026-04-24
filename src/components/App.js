import Gallery from './Gallery';
import AddForm from './AddForm';

export default class App {
  constructor() {
    this.galleryContainer = document.getElementById('gallery');
    this.nameInput = document.getElementById('imageName');
    this.urlInput = document.getElementById('imageUrl');
    this.addButton = document.getElementById('addBtn');
    this.errorContainer = document.getElementById('errorMsg');

    this.init();
  }

  init() {
    this.gallery = new Gallery(this.galleryContainer);

    this.addForm = new AddForm(
      this.nameInput,
      this.urlInput,
      this.addButton,
      this.errorContainer,
      (name, url) => this.gallery.addImage(name, url)
    );
  }
}
