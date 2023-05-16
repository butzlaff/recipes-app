import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import foodRecipesImage from '../../images/mealsCategories/icons8-poultry-leg-50.png';
import drinkRecipesImage from '../../images/drinksCategories/icons8-cocktail-50.png';
import allRecipesImage from '../../images/icons8-cookbook-50.png';

export default function FilterButtons({
  setFilteredDoneRecipes = () => {},
  setFilteredFavoriteRecipes = () => {},
}) {
  const buttonName = ['Meals', 'Drinks'];
  const {
    location: { pathname },
  } = useHistory();

  function handleFilter(filter) {
    if (pathname === '/done-recipes') {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const filteredRecipes = doneRecipes.filter(({ type }) => type === filter);
      setFilteredDoneRecipes(filteredRecipes);
    } else {
      const favoriteRecipes = JSON.parse(
        localStorage.getItem('favoriteRecipes'),
      );
      const filteredRecipes = favoriteRecipes.filter(
        ({ type }) => type === filter,
      );
      setFilteredFavoriteRecipes(filteredRecipes);
    }
  }

  const isMealButton = (name) => name === 'Meals';

  const filterButtonsImages = {
    All: allRecipesImage,
    Meals: foodRecipesImage,
    Drinks: drinkRecipesImage,
  };

  return (
    <div className="flex items-baseline justify-center gap-2 overflow-auto px-2 mb-4">
      {buttonName.map((name) => (
        <button
          key={ `${name}-filter` }
          className="
            text-white
            flex flex-col items-center
            justify-center px-2 py-1 rounded-md
            gap-2
          "
          id={ isMealButton(name) ? 'meal' : 'drink' }
          onClick={ ({ target }) => handleFilter(target.id) }
          data-testid={
            isMealButton(name) ? 'filter-by-meal-btn' : 'filter-by-drink-btn'
          }
        >
          <img
            src={ filterButtonsImages[name] }
            alt=""
          />
          <span className="text-violet-400 text-sm w-10 flex justify-center items-center">
            {name}
          </span>
        </button>
      ))}
      <button
        data-testid="filter-by-all-btn"
        className="
            text-white
            flex flex-col items-center
            justify-center px-2 py-1 rounded-md
            gap-2
          "
        onClick={ () => {
          if (pathname === '/done-recipes') {
            setFilteredDoneRecipes([]);
          } else {
            setFilteredFavoriteRecipes([]);
          }
        } }
      >
        <img src={ filterButtonsImages.All } alt="" />
        <span className="text-violet-400 text-sm w-10 flex justify-center items-center">
          All
        </span>
      </button>
    </div>
  );
}

FilterButtons.propTypes = {
  setFilteredDoneRecipes: PropTypes.func,
  setFilteredFavoriteRecipes: PropTypes.func,
};
