const Recipes = require('./models/recipes.js');
const SelectView = require('./views/select_view.js');
const RecipeListView = require('./views/recipe_list_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const selectElement = document.querySelector('select#ingredient-select');
  const selectView = new SelectView(selectElement);
  selectView.bindEvents();

  const listContainer = document.querySelector('#recipe-list');
  const recipeListView = new RecipeListView(listContainer);
  recipeListView.bindEvents();

  const recipes = new Recipes;
  recipes.bindEvents();
  recipes.getData();

});
