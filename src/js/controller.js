import {
  getRecipeData,
  getRecipeServings,
  getRecipesPerPage,
  getSearchedRecipes,
  state,
} from './model.js';
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
    searchResultsView.update(getRecipesPerPage(state.search.pageNumber));
    await getRecipeData(id);
    recipeView.render(state.recipe);
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
const init = function () {
  recipeView.addRenderHandler(controlRecipe);
  searchView.addSearchHandler(controlSearch);
  paginationView.addpaginationhandler(controlPagination);
  recipeView.addServingsHandler(controlServingsChange);
};

init();
