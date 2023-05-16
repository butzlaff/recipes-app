import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import RecipeCard from '../RecipeCard';
import CategoriesBar from '../CategoriesBar';

function Recipes({
  meals,
  drinks,
  filteredMealsByCategory,
  filteredDrinksByCategory,
}) {
  const { id } = useParams();
  const {
    location: { pathname },
  } = useHistory();

  const currentCategory = pathname === '/drinks'
    ? filteredDrinksByCategory : filteredMealsByCategory;

  const [hasFilterByCategory, setHasFilterByCategory] = useState(false);

  useEffect(() => {
    setHasFilterByCategory(currentCategory.length > 0);
  }, [currentCategory]);

  return (
    <div className="flex justify-center gap-2 flex-wrap mb-20">
      <CategoriesBar setHasFilterByCategory={ setHasFilterByCategory } />
      {pathname.includes('meals')
        ? (hasFilterByCategory ? filteredMealsByCategory : meals).map(
          ({ idMeal, strMeal, strMealThumb }, i) => (
            <RecipeCard
              key={ idMeal }
              id={ idMeal }
              name={ strMeal }
              thumb={ strMealThumb }
              index={ i }
            />
          ),
        )
        : (hasFilterByCategory ? filteredDrinksByCategory : drinks).map(
          ({ idDrink, strDrink, strDrinkThumb }, i) => (
            <RecipeCard
              key={ idDrink }
              id={ idDrink }
              name={ strDrink }
              thumb={ strDrinkThumb }
              index={ i }
            />
          ),
        )}
      {id ?? ''}
    </div>
  );
}

const mapStateToProps = ({
  recipes: { meals, drinks, filteredMealsByCategory, filteredDrinksByCategory },
}) => ({
  meals,
  drinks,
  filteredMealsByCategory,
  filteredDrinksByCategory,
});

Recipes.propTypes = {
  drinks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filteredDrinksByCategory: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filteredMealsByCategory: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Recipes);
