import { API_URL, RECIPES_PER_PAGE } from './config';
import { getJSON } from './helper';

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

export const getRecipeData = async function (id) {
  try {
    const { data: { recipe } = '' } = await getJSON(`${API_URL}${id}`);

    if (!recipe) throw new Error('Recipe not found');
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
    };

    state.recipe.bookmarked = state.bookmarks.some(
      bookmark => bookmark._id === state.recipe._id
    );
  } catch (error) {
    throw error;
  }
};
export const getSearchedRecipes = async function (query) {
  try {
    const { data: { recipes } = '' } = await getJSON(
      `${API_URL}?search=${query}`
    );
    if (recipes.length === 0)
      throw new Error('No Recipes Found With This Category.');
    mappedRecipes = recipes.map(recipe => {
      return {
        _id: recipe.id,
        title: recipe.title,
        imageUrl: recipe.image_url,
        publisher: recipe.publisher,
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
  state.bookmarks.push(recipe);
  state.recipe.bookmarked = true;
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
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  console.log('bookmarks :>> ', bookmarks);
  if (bookmarks) state.bookmarks = bookmarks;
};
