import icons from '../../img/icons.svg';
import View from './View';
class SearchResultsView extends View {
  constructor(parentElement, errorMessage, successMessage) {
    super(parentElement, errorMessage, successMessage);
  }
  _generateMarkup() {
    return this.data.map(this.#generateSearchResultsMarkup).join(' ');
  }
  #generateSearchResultsMarkup(recipe) {
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
            <use href=${icons}#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
    </li>
  `;
  }
}
export default new SearchResultsView(
  document.querySelector('.results'),
  'No Recipes With This Query 🍴🙈',
  'Recipes Found 😋'
);
