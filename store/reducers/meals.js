//Meals Reducer State Updating Logic
//Manages favorites and filters
//This is called in APP.JS

import { MEALS } from "../../data/dummy-data";
import { SET_FILTERS, TOGGLE_FAVORITE } from "../actions/meals";

//Start with all the meals
const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        //it is already favorited, so unfavorite it.
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeals };
      } else {
        //It isn't favorited, so favorite it.
        const meal = state.meals.find((meal) => meal.id === action.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters; //comes from meals.js under actions folder
      const updatedFilteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && meal.isGlutenFree) {
          return true;
        }
        if (appliedFilters.lactoseFree && meal.isLactoseFree) {
          return true;
        }
        if (appliedFilters.vegan && meal.isVegan) {
          return true;
        }
        if (appliedFilters.vegetarian && meal.isVegetarian) {
          return true;
        }
        return false;
      });

      return { ...state, filteredMeals: updatedFilteredMeals };
    default:
      return state;
  }
};

export default mealsReducer;
