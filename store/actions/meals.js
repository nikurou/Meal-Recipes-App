export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const SET_FILTERS = "SET_FILTERS";

export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, mealId: id };
};

//Param: Expect to be an Object with {isGlucoseFree: true, isVegan: false...} etc.
export const setFilters = (filterSetting) => {
  return { type: SET_FILTERS, filters: filterSetting };
};
