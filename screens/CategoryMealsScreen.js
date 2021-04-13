import React from "react";
import { useSelector } from "react-redux";
import { CATEGORIES } from "../data/dummy-data";

import MealList from "../components/MealList";

const CategoryMealsScreen = (props) => {
  const categoryId = props.navigation.getParam("categoryId");

  //Taken from app.js's store
  // meals is the key given to mealsReducer in app.js
  // Gives us access to that state slice, and we thus grab the filteredMeals from meals.js
  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  );

  // Return list of mealItems
  // Navigation property must be passed down.
  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

//Header Title and Styling that is dynamic based on Changing Data
// RN automatically passes in navigationData you use navigationOptions as a function.
CategoryMealsScreen.navigationOptions = (navigationData) => {
  const categoryId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);
  return {
    headerTitle: selectedCategory.title,
  };
};

export default CategoryMealsScreen;
