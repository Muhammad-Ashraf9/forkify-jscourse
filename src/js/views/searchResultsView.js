import Preview from './preview';
class SearchResultsView extends Preview {
  constructor(parentElement, errorMessage, successMessage) {
    super(parentElement, errorMessage, successMessage);
  }
}
export default new SearchResultsView(
  document.querySelector('.results'),
  'No Recipes With This Query 🍴🙈',
  'Recipes Found 😋'
);
