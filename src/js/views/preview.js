import icons from '../../img/icons.svg';
import View from './View';
export default class Preview extends View {
  constructor(parentElement, errorMessage, successMessage) {
    super(parentElement, errorMessage, successMessage);
  }
  _generateMarkup() {
    return this.data.map(this.#generatePreviewMarkup).join(' ');
  }
  #generatePreviewMarkup(recipe) {
    return `<li class="preview">
    <a class="preview__link  ${
      window.location.hash.slice(1) === recipe._id && 'preview__link--active'
    }" href=#${recipe._id}>
      <figure class="preview__fig">
        <img src=${recipe.imageUrl} alt=${recipe.title} />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${recipe.title}</h4>
        <p class="preview__publisher">${recipe.publisher}</p>
        <div class="preview__user-generated">
        <svg>
        <use href="${icons}#${recipe.key && 'icon-user'}"></use>
      </svg>
        </div>
      </div>
    </a>
    </li>
  `;
  }
}
