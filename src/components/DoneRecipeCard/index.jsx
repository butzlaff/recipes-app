import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import { ShareNetwork } from '@phosphor-icons/react';

export default function DoneRecipeCard({
  index = 0,
  name = '',
  doneDate = '',
  tags = [],
  nationality = '',
  category = '',
  alcoholicOrNot = '',
  type = '',
  id = '',
  image = '',
}) {
  console.log(category);
  const [isRecipeCopied, setIsRecipeCopied] = useState();
  const history = useHistory();
  const doneRecipesPath = 'done-recipes';
  console.log(alcoholicOrNot);
  function handleShareButton() {
    if (type === 'meal') {
      const url = window.location.href.replace(doneRecipesPath, `meals/${id}`);
      clipboardCopy(url);
      console.log(url);
    } else {
      const url = window.location.href.replace(doneRecipesPath, `drinks/${id}`);
      clipboardCopy(url);
      console.log(url);
    }
    setIsRecipeCopied(true);
  }

  function redirectToDetails() {
    const redirectUrl = type === 'meal' ? `/meals/${id}` : `/drinks/${id}`;
    console.log(redirectUrl, type);
    history.push(redirectUrl);
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
    <div className="flex w-full ml-4">
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
          flex flex-col px-3 justify-between py-1
          w-40 border border-stone-400
          rounded-r-lg
        "
      >
        <div className="flex gap-4">
          <button
            data-testid={ `${index}-horizontal-name` }
            onClickCapture={ redirectToDetails }
            className="flex flex-col justify-center items-center"
          >
            <p className="text-sm font-bold">{name}</p>
            <p
              data-testid={ `${index}-horizontal-top-text` }
              className="text-[0.5rem] font-semibold text-neutral-400"
            >
              {`${nationality && `${nationality} - `} ${category}`}
              {alcoholicOrNot ? ' - Alcoholic' : null}
            </p>
          </button>
          <button onClick={ handleShareButton } src="shareIcon">
            {isRecipeCopied ? (
              <span className="text-[0.45rem] flex">Link copied!</span>
            ) : (
              <ShareNetwork
                src="shareIcon"
                alt="share-btn"
                size={ 24 }
                weight="fill"
                color="#FCC436"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            )}
          </button>
        </div>
        <p
          data-testid={ `${index}-horizontal-done-date` }
          className="text-[0.5rem] font-medium"
        >
          {`Done in: ${doneDate}`}
        </p>
        <div className="flex gap-2">
          {tags.map((tag, i) => (
            <p
              key={ i }
              data-testid={ `${index}-${tag}-horizontal-tag` }
              className="text-[0.45rem] rounded-full bg-neutral-300 text-neutral-700 px-1"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  category: PropTypes.string,
  doneDate: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  nationality: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  alcoholicOrNot: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
};
