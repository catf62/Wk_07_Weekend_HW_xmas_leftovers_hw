const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Recipes = function () {
  this.recipesData = [];
  this.ingredients = [];
};

Recipes.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:change', (evt)  => {
    const ingredientIndex = evt.detail;
    this.publishRecipesByIngredient(ingredientIndex);
  })
};

Recipes.prototype.getData = function () {
  const request = new RequestHelper('http://www.recipepuppy.com/api');
  request.get((data) => {
    PubSub.publish('Recipes:recipes-ready', data);
    this.publishIngredients(data);
  });
}

Recipes.prototype.publishRIngredients = function (data) {
  this.recipesData = data;
  this.recipes = this.uniqueIngredientsList();
  PubSub.publish('Recipes:ingredients-ready', this.regions);
}

Recipes.prototype.ingredientsList = function () {
  const fullList = this.recipesData.map(recipe => recipe.region);
  return fullList;
}

Recipes.prototype.uniqueIngredientList = function () {
  return this.ingredientList().filter((recipe, index, array) => {
    return array.indexOf(recipe) === index;
  });
}

Recipes.prototype.recipesByIngredient = function (ingredientIndex) {
  const selectedIngredient = this.ingredients[ingredientIndex];
  return this.ingredientsData.filter((ingredient) => {
    return ingredient.region === selectedIngredient;
  });
};

Recipes.prototype.publishRecipesByIngredient = function (ingredientIndex) {
  const foundRecipes = this.recipesByIngredient(ingredientIndex);
  PubSub.publish('Recipes:recipes-ready', foundRecipes);
};

module.exports = Recipes;
