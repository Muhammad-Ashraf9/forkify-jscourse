import {
  addBookmark,
  deleteBookmark,
  getRecipeData,
  getRecipeServings,
  getRecipesPerPage,
  getSearchedRecipes,
  presistBookmarks,
  state,
} from './model.js';
import addRecipeView from './views/addRecipeView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import searchResultsView from './views/searchResultsView.js';
import searchView from './views/searchView.js';

//Hot reloading
if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    await getRecipeData(id);
    recipeView.render(state.recipe);
    searchResultsView.update(getRecipesPerPage(state.search.pageNumber));
    if (state.bookmarks.length > 0) bookmarksView.update(state.bookmarks);
  } catch (error) {
    recipeView.renderErrorMessage();
  }
};
const controlSearch = async function () {
  try {
    const query = searchView.getInputValue();
    if (!query) return;
    searchResultsView.renderSpinner();
    await getSearchedRecipes(query);
    searchResultsView.render(getRecipesPerPage());
    paginationView.render(state);
  } catch (error) {
    searchResultsView.renderErrorMessage();
  }
};
const controlPagination = function (page) {
  searchResultsView.render(getRecipesPerPage(page));
  paginationView.render(state);
};
const controlServingsChange = function (servingsNumber) {
  getRecipeServings(servingsNumber);
  recipeView.update(state.recipe);
};
const controlBookmark = function () {
  if (state.recipe.bookmarked) deleteBookmark(state.recipe._id);
  else addBookmark(state.recipe);
  recipeView.update(state.recipe);
  bookmarksView.render(state.bookmarks);
};
const controlUploadRecipe = function (formData) {
  console.log('formData :>> ', formData);
  const uploadRecipeObject = {};
  const ingredients = [];
  for (const [key, value] of Object.entries(formData)) {
    if (!key.startsWith('ingredient')) uploadRecipeObject[key] = value;
    if (key.startsWith('ingredient') && value.trim() !== '') {
      const ingredientArray = value.split(',');
      if (ingredientArray.length !== 3) throw Error('Wrong ingredient format.');
      ingredients.push({
        quantity: +ingredientArray[0] || null,
        unit: ingredientArray[1] || '',
        description: ingredientArray[2],
      });
    }
    // console.log(`${key}: ${value}`);
  }
  uploadRecipeObject.ingredients = ingredients;
  console.log(ingredients);
  console.log(uploadRecipeObject);
};
const init = function () {
  presistBookmarks();
  recipeView.addRenderHandler(controlRecipe);
  recipeView.addServingsHandler(controlServingsChange);
  recipeView.addBookmarkHandler(controlBookmark);
  searchView.addSearchHandler(controlSearch);
  paginationView.addpaginationhandler(controlPagination);
  bookmarksView.render(state.bookmarks);
  addRecipeView.addUploadRecipeHandler(controlUploadRecipe);
};
init();
