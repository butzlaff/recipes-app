import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import { ShareNetwork, Heart } from '@phosphor-icons/react';

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
    <div className="flex w-full">
      <button onClick={ redirectToDetails } className="h-full w-40">
        <img
          className="w-full h-32 object-cover rounded-l-lg"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </button>
      <div
        className="
          flex flex-col px-3 justify-around py-1
          w-40 border border-stone-400
          rounded-r-lg
        "
      >
        <button
          data-testid={ `${index}-horizontal-name` }
          onClick={ redirectToDetails }
          className="flex flex-col justify-center items-center"
        >
          <p className="text-md font-bold">{name}</p>
          <p
            data-testid={ `${index}-horizontal-top-text` }
            className="text-[0.5rem] font-semibold text-neutral-400"
          >
            {`${nationality && `${nationality} - `} ${category}`}
            {alcoholicOrNot ? ' - Alcoholic' : null}
          </p>
        </button>
        <div className="flex gap-4">
          <button onClick={ handleShareButton } src="shareIcon">
            {isRecipeCopied ? (
              <span className="text-[0.45rem] flex">Link copied!</span>
            ) : (
              <ShareNetwork
                src="shareIcon"
                alt="share-btn"
                color="#FCC436"
                size={ 24 }
                weight="fill"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            )}
          </button>
          <button onClick={ handleUnfavoriteButton }>
            <Heart
              src="blackHeartIcon"
              data-testid={ `${index}-horizontal-favorite-btn` }
              alt="filled heart icon"
              color="#FCC436"
              size={ 24 }
              weight="fill"
            />
          </button>
        </div>
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
