import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import CatogoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import Colors from "../constants/Colors";
import { Platform } from "react-native";
import CategoriesScreen from "../screens/CategoriesScreen";

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: { headerTitle: "Meal Categories" },
    },
    CategoryMeals: {
      headerTitle: "Meal Categories!!",
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailsScreen,
    Filter: FiltersScreen,
    Favorites: FavoritesScreen,
  },
  {
    initialRouteName: "Categories",
    //Default header styling
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor:
          Platform.OS === "android" || Platform.OS === "web"
            ? Colors.primaryColor
            : "",
      },
      headerTintColor:
        Platform.OS === "android" || Platform.OS === "web"
          ? "#ffff"
          : Colors.primaryColor,
    },
    mode: "modal", //depending on modal or card, you get different animations when switching screens on IOS
  }
);

export default createAppContainer(MealsNavigator);
