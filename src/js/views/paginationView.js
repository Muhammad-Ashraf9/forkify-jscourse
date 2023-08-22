import icons from '../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  constructor(parentElement) {
    super(parentElement);
  }
  addpaginationhandler(handler) {
    this.parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.pagination__btn');
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo;
      handler(updateTo);
    });
  }
  #generateNextButton() {
    return ` <button class="btn--inline pagination__btn pagination__btn--next" data-update-to="${
      this.data.search.pageNumber + 1
    }">
    <span>Page ${this.data.search.pageNumber + 1}</span>
    <svg class="search__icon">
      <use href="${icons}.svg#icon-arrow-right"></use>
    </svg>
  </button>`;
  }
  #generatePrevButton() {
    return `<button class="btn--inline pagination__btn pagination__btn--prev" data-update-to="${
      this.data.search.pageNumber - 1
    }">
  <svg class="search__icon">
    <use href="${icons}.svg#icon-arrow-left"></use>
  </svg>
  <span>Page ${this.data.search.pageNumber - 1}</span>
</button>`;
  }
  _generateMarkup() {
    const totalPages = this.data.search.numberOfPages;
    const page = this.data.search.pageNumber;
    if (page == 1 && totalPages > 1) return this.#generateNextButton();
    if (page == totalPages && page !== 1) return this.#generatePrevButton();
    if (page > 1 && page < totalPages)
      return `${this.#generatePrevButton()}${this.#generateNextButton()}`;
  }
}
export default new PaginationView(document.querySelector('.pagination'));
