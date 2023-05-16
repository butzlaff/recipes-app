import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function FavoriteRecipeCard({
  index = 0,
  name = '',
  nationality = '',
  category = '',
  type = '',
  id = '',
  image = '',
  alcoholicOrNot = '',
  handleUnfavorite = () => {},
}) {
  const [isRecipeCopied, setIsRecipeCopied] = useState();
  const history = useHistory();
  const favoriteRecipesPath = 'favorite-recipes';

  function handleShareButton() {
    if (type === 'meal') {
      const url = window.location.href.replace(
        favoriteRecipesPath,
        `meals/${id}`,
      );
      clipboardCopy(url);
    } else {
      const url = window.location.href.replace(
        favoriteRecipesPath,
        `drinks/${id}`,
      );
      clipboardCopy(url);
    }
    setIsRecipeCopied(true);
  }

  function redirectToDetails() {
    const redirectUrl = type === 'meal' ? `/meals/${id}` : `/drinks/${id}`;
    history.push(redirectUrl);
  }

  function handleUnfavoriteButton() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteRecipes = favoriteRecipes.filter(
      (recipe) => recipe.id !== id,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    handleUnfavorite(newFavoriteRecipes);
  }

  useEffect(() => {
    if (isRecipeCopied) {
      const maxTime = 2000;
      const timeout = setTimeout(() => {
        setIsRecipeCopied(false);
      }, maxTime);
      return () => clearTimeout(timeout);
    }
  }, [isRecipeCopied]);

  return (
    <div>
      <button onClick={ redirectToDetails }>
        <img
          className="h-20 w-20"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </button>
      <div>
        <div>
          <button
            data-testid={ `${index}-horizontal-name` }
            onClick={ redirectToDetails }
          >
            {name}
          </button>
          <span data-testid={ `${index}-horizontal-top-text` }>
            {`- ${nationality} - ${category}`}
            {alcoholicOrNot ? ' - Alcoholic' : null}
          </span>
        </div>
        <button onClick={ handleShareButton } src="shareIcon">
          <img
            src={ shareIcon }
            alt="share-btn"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        <button onClick={ handleUnfavoriteButton }>
          <img
            src={ blackHeartIcon }
            data-testid={ `${index}-horizontal-favorite-btn` }
            alt="filled heart icon"
          />
        </button>
        {isRecipeCopied && 'Link copied!'}
      </div>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  category: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  nationality: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  handleUnfavorite: PropTypes.func,
  alcoholicOrNot: PropTypes.string,
};
