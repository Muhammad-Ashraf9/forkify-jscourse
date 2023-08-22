class SearchView {
  #parentElement = document.querySelector('.search');
  getInputValue() {
    return this.#parentElement.querySelector('.search__field').value;
  }
  addSearchHandler(handler) {
    this.#parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
