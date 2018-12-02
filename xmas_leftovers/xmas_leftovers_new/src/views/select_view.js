const PubSub = require('../helpers/pub_sub');

const SelectView = function (selectElement) {
  this.selectElement = selectElement;
};

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Recipes:ingredients-ready', (evt) => {
    console.log(evt);
    this.populateSelect(evt.detail);
  });

  this.selectElement.addEventListener('change', (evt) => {
    const selectedIndex = evt.target.value;
    PubSub.publish('SelectView:change', selectedIndex);
  });
};

SelectView.prototype.populateSelect = function (ingredients) {
  ingredients.forEach((ingredient, index) => {
    const option = this.createIngredientOption(ingredient, index);
    this.selectElement.appendChild(option);
  })
};

SelectView.prototype.createIngredientOption = function (ingredient, index) {
  const option = document.createElement('option');
  option.textContent = ingredient;
  option.value = index;
  return option;
};

module.exports = SelectView;
