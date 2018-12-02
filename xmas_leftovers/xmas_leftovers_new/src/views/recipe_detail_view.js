const RecipeDetailView = function () {};

RecipeDetailView.prototype.createRecipeDetail = function (recipe) {
  const recipeDetail = document.createElement('div');
  recipeDetail.classList.add('recipe-detail');

  const title = document.createElement('h3');
  title.classList.add('recipe-title')
  title.textContent = recipe.title;

  const recipeParent = document.createElement('div');
  recipeParent.classList.add('recipe-parent');
  recipeParent.appendChild(title);
  recipeParent.appendChild(recipeDetail);

  // making an image element for the html
  const recipeImage = document.createElement('img');
  recipeImage.classList.add('recipe-image');
  recipeImage.src = recipe.thumbnail;
  recipeDetail.appendChild(recipeImage);

  const detailsList = document.createElement('ul');
  detailsList.classList.add('recipe-list')

  const ingredientsList = this.createDetailListItem('Leftover Searched For', recipe.ingredients);
  detailsList.appendChild(ingredientsList);

  // making a link element for the html
  const recipeLink = document.createElement('a');
  // setting the tect content of the linke element
  recipeLink.textContent = recipe.href;
  // setting where the link should lead to
  recipeLink.href = recipe.href;
  // open the link in a new tab
  recipeLink.target = "_blank";
  // creating list/bullet point item
  const recipeLinkListItem = this.createDetailListItem('Link to Recipe', "")
  // adding the link to the bullet point
  recipeLinkListItem.appendChild(recipeLink);
  // adding the bullet point to the list
  detailsList.appendChild(recipeLinkListItem);



  recipeDetail.appendChild(detailsList);
  return recipeParent;
};

RecipeDetailView.prototype.createDetailListItem = function (label, property) {
  const element = document.createElement('li');
  element.textContent = `${label}: ${property}`;
  return element;
};

module.exports = RecipeDetailView;
