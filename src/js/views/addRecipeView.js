import icons from '../../img/icons.svg';
import View from './View';

class AddRecipeView extends View {
  #btnAddRecipe = document.querySelector('.nav__btn--add-recipe');
  #btnCloseModal = document.querySelector('.btn--close-modal');
  #overlay = document.querySelector('.overlay');
  #window = document.querySelector('.add-recipe-window');

  constructor(parentElement) {
    super(parentElement);
    this.#addAddRecipeHandler();
    this.#addCloseModalHandler();
  }
  #toggleOverlay() {
    this.#overlay.classList.toggle('hidden');
    this.#window.classList.toggle('hidden');
  }
  #addAddRecipeHandler() {
    this.#btnAddRecipe.addEventListener(
      'click',
      this.#toggleOverlay.bind(this)
    );
  }
  #addCloseModalHandler() {
    this.#btnCloseModal.addEventListener(
      'click',
      this.#toggleOverlay.bind(this)
    );
  }
  #uploadEventListenerFunction() {
    console.log(' this :>> ', this); //this =>event listener=> element = > this.parentElement
    const formData = new FormData(this.parentElement);
    formData.append();
    handler(formData);
  }
  addUploadRecipeHandler(handler) {
    this.parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.upload__btn');
      if (!btn) return;
      console.log(' btn :>> ', btn); //this =>event listener=> element = > this.parentElement
      console.log(' this :>> ', this); //this =>event listener=> element = > this.parentElement
      const formData = new FormData(this);
      const formDataObject = Object.fromEntries(formData);
      handler(formDataObject);
    });
  }
  _generateMarkup() {}
}
export default new AddRecipeView(document.querySelector('.upload'));
