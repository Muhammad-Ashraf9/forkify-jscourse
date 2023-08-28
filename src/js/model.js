import { API_KEY, API_URL, RECIPES_PER_PAGE } from './config';
import { AJAX, getJSON } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    recipes: [],
    numberOfPages: 0,
    pageNumber: 1,
    recipesPerPage: RECIPES_PER_PAGE,
  },
  bookmarks: [],
};
function formatAndStateRecipe(recipe) {
  state.recipe = {
    _id: recipe.id,
    title: recipe.title,
    cookingTime: recipe.cooking_time,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    bookmarked: false,
    ...(recipe.key && { key: recipe.key }),
  };
}
export const getRecipeData = async function (id) {
  try {
    const { data: { recipe } = '' } = await AJAX(
      `${API_URL}${id}?key=${API_KEY}`
    );

    if (!recipe) throw new Error('Recipe not found');
    formatAndStateRecipe(recipe);

    state.recipe.bookmarked = state.bookmarks.some(
      bookmark => bookmark._id === state.recipe._id
    );
  } catch (error) {
    throw error;
  }
};
export const getSearchedRecipes = async function (query) {
  try {
    const { data: { recipes } = '' } = await AJAX(
      `${API_URL}?search=${query}&key=${API_KEY}`
    );
    if (recipes.length === 0)
      throw new Error('No Recipes Found With This Category.');
    mappedRecipes = recipes.map(recipe => {
      return {
        _id: recipe.id,
        title: recipe.title,
        imageUrl: recipe.image_url,
        publisher: recipe.publisher,
        ...(recipe.key && { key: recipe.key }),
      };
    });
    state.search.query = query;
    state.search.recipes = [...mappedRecipes];
    state.search.numberOfPages = Math.ceil(
      recipes.length / state.search.recipesPerPage
    );
  } catch (error) {
    throw error;
  }
};
export const getRecipesPerPage = function (page = 1) {
  state.search.pageNumber = page;
  const start = (page - 1) * state.search.recipesPerPage;
  const end = page * state.search.recipesPerPage;
  return state.search.recipes.slice(start, end);
};
export const getRecipeServings = function (servingsNumber) {
  const servingsRatio = servingsNumber / state.recipe.servings;
  //side effects change in state
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity = ((ingredient.quantity || 1) * servingsRatio).toFixed(
      2
    ); //nulls =>1     2decimal
  });
  state.recipe.servings = servingsNumber;
};
export const addBookmark = function (recipe) {
  state.recipe.bookmarked = true;
  state.bookmarks.push(recipe);
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
export const deleteBookmark = function (recipeId) {
  const filteredBookmarks = state.bookmarks.filter(
    bookmark => bookmark._id !== recipeId
  );
  state.bookmarks = [...filteredBookmarks];
  state.recipe.bookmarked = false;
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
export const presistBookmarks = function () {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  state.bookmarks = bookmarks;
};
export const uploadRecipe = async function (addedRecipe) {
  const formattedUploadRecipe = {
    title: addedRecipe.title,
    cooking_time: addedRecipe.cookingTime,
    image_url: addedRecipe.image,
    ingredients: addedRecipe.ingredients,
    publisher: addedRecipe.publisher,
    servings: addedRecipe.servings,
    source_url: addedRecipe.sourceUrl,
  };
  const {
    data: { recipe },
  } = await AJAX(`${API_URL}?key=${API_KEY}`, formattedUploadRecipe);
  formatAndStateRecipe(recipe);
  console.log('state.recipe :>> ', state.recipe);
  addBookmark(state.recipe);
};
