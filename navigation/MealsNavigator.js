import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import CatogoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import Colors from "../constants/Colors";
import { Platform } from "react-native";
import CategoriesScreen from "../screens/CategoriesScreen";
import { Ionicons } from "@expo/vector-icons";

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

//MealsFavTabNavigator has the MealsNavigator stack nested in it!
//Therefore when we export createAppContainer, we should pass this as the param
const MealsFavTabNavigator = createBottomTabNavigator(
  {
    Meals: {
      screen: MealsNavigator,
      navigationOptions: {
        tabBarLabel: "Meals",
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="ios-restaurant"
              size={25}
              color={tabInfo.tintColor} //automatically grabbed color from activeTintColor
            />
          );
        },
      },
    },
    Favorites: {
      screen: FavoritesScreen,
      navigationOptions: {
        tabBarLabel: "Favorites",
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="ios-star"
              size={25}
              color={tabInfo.tintColor} //automatically grabbed color from activeTintColor
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.accentColor,
    },
  }
);

export default createAppContainer(MealsFavTabNavigator);
