import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DoneRecipeCard from '../../components/DoneRecipeCard';
import FilterButtons from '../../components/FilterButtons';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);
  const hasAnyFilter = filteredDoneRecipes.length > 0;

  return (
    <div>
      <Header title="Done Recipes" />
      <FilterButtons setFilteredDoneRecipes={ setFilteredDoneRecipes } />
      <div>
        {(hasAnyFilter ? filteredDoneRecipes : doneRecipes)?.map(
          (
            {
              name,
              doneDate,
              tags,
              nationality,
              category,
              alcoholicOrNot,
              type,
              id,
              image,
            },
            i,
          ) => (
            <DoneRecipeCard
              key={ name }
              name={ name }
              doneDate={ doneDate }
              tags={ tags }
              nationality={ nationality }
              category={ category }
              alcoholicOrNot={ alcoholicOrNot }
              type={ type }
              index={ i }
              id={ id }
              image={ image }
            />
          ),
        )}
      </div>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
