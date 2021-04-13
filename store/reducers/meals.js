//Meals Reducer State Updating Logic
//Manages favorites and filters
//This is called in APP.JS

import { MEALS } from "../../data/dummy-data";

//Start with all the meals
const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  return state;
};

export default mealsReducer;
