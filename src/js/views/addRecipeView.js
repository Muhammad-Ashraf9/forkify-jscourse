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
  addUploadRecipeHandler(handler) {
    this.parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.upload__btn');
      if (!btn) return;
      //this =>event listener=> element = > this.parentElement
      const formData = new FormData(this);
      handler(...formData);
    });
  }
  closeModal() {
    if (this.#overlay.classList.contains('hidden')) return;
    this.#toggleOverlay();
  }
  _generateMarkup() {
    return ` <div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input value="TESTTTT" required name="title" type="text" />
    <label>URL</label>
    <input value="TESTTTT" required name="sourceUrl" type="text" />
    <label>Image URL</label>
    <input value="TESTTTT" required name="image" type="text" />
    <label>Publisher</label>
    <input value="TESTTTT" required name="publisher" type="text" />
    <label>Prep time</label>
    <input value="23" required name="cookingTime" type="number" />
    <label>Servings</label>
    <input value="23" required name="servings" type="number" />
  </div>

  <div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>
    <label>Ingredient 1</label>
    <input
      value="0.5,kg,Rice"
      type="text"
      required
      name="ingredient-1"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 2</label>
    <input
      value="1,,Avocado"
      type="text"
      name="ingredient-2"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 3</label>
    <input
      value=",,salt"
      type="text"
      name="ingredient-3"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 4</label>
    <input
      type="text"
      name="ingredient-4"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 5</label>
    <input
      type="text"
      name="ingredient-5"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 6</label>
    <input
      type="text"
      name="ingredient-6"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
  </div>

  <button class="btn upload__btn">
    <svg>
      <use href="${icons}.svg#icon-upload-cloud"></use>
    </svg>
    <span>Upload</span>
  </button>`;
  }
}
export default new AddRecipeView(document.querySelector('.upload'));
