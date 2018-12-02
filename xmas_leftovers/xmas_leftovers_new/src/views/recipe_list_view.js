const PubSub = require('../helpers/pub_sub.js');
const RecipeDetailView = require('./recipe_detail_view');

const RecipeListView = function (container) {
  this.container = container;
};

RecipeListView.prototype.bindEvents = function () {
  PubSub.subscribe('Recipes:recipes-ready', (evt) => {
    this.clearList();
    this.renderRecipeDetailViews(evt.detail);
  });
};

RecipeListView.prototype.clearList = function () {
  this.container.innerHTML = '';
};

RecipeListView.prototype.renderRecipeDetailViews = function (recipes) {
  recipes.forEach((recipe) => {
    const recipeItem = this.createRecipeListItem(recipe);
    this.container.appendChild(recipeItem);
  });
};

RecipeListView.prototype.createRecipeListItem = function (recipe) {
  const recipeDetailView = new RecipeDetailView();
  const recipeDetail = recipeDetailView.createRecipeDetail(recipe);
  return recipeDetail;
};

module.exports = RecipeListView;
