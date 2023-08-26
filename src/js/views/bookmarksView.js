import Preview from './preview';
class BookmarksView extends Preview {
  constructor(parentElement, errorMessage, successMessage) {
    super(parentElement, errorMessage, successMessage);
  }
}
export default new BookmarksView(
  document.querySelector('.bookmarks__list'),
  'No bookmarks yet. Find a nice recipe and bookmark it 🍴🙈',
  'bookmarks Found 😋'
);
