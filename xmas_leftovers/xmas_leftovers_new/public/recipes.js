const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Recipes = function () {
  this.recipesData = [];
  this.ingredients = ["Turkey",
"Stuffing",
"Potato",
"Carrot",
"Parsnip",
"Gravy",
"Sausage",
"Peas",
"Corn",
"Custard",
"Cream",
"Cabbage",
"Wine",
"Eggnog",
"Cranberries"];
};

Recipes.prototype.getData = function (ingredient) {
  let url = 'http://www.recipepuppy.com/api';
  if (ingredient !== null && ingredient !== undefined){
    url += "?i=" + ingredient;
  }
  const request = new RequestHelper(url);
  request.get()
    .then((data) => {
      this.recipesData = data.results;
      PubSub.publish('Recipes:recipes-ready', this.recipesData);
      PubSub.publish('Recipes:ingredients-ready', this.ingredients);
    });
}


Recipes.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:change', (evt)  => {
    const ingredientIndex = evt.detail;
    this.publishRecipesByIngredient(ingredientIndex);
  })
};

Recipes.prototype.publishRecipesByIngredient = function (ingredientIndex) {
  const filteredIngredients = this.getData(this.ingredients[ingredientIndex]);
};

module.exports = Recipes;
