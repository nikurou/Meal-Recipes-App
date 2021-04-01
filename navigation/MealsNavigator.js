import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import CatogoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import Colors from "../constants/Colors";
import { Platform, Text } from "react-native";
import CategoriesScreen from "../screens/CategoriesScreen";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor:
      Platform.OS === "android" || Platform.OS === "web"
        ? Colors.primaryColor
        : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor:
    Platform.OS === "android" || Platform.OS === "web"
      ? "#ffff"
      : Colors.primaryColor,
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: { headerTitle: "Meal Categories" },
    },
    CategoryMeals: {
      headerTitle: "Meal Categories",
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailsScreen,
    Filter: FiltersScreen,
    Favorites: FavoritesScreen,
  },
  {
    initialRouteName: "Categories",
    //Default header styling
    defaultNavigationOptions: defaultStackNavOptions,
    mode: "modal", //depending on modal or card, you get different animations when switching screens on IOS
  }
);

//Favorite Tabs Screen Stack
const FavNavigator = createStackNavigator(
  {
    Favorites: { screen: FavoritesScreen },
    MealDetail: { screen: MealDetailsScreen },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

//Bottom Tab Navigator
const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator, //We can use screen stacks as screens.
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
      tabBarColor: Colors.primaryColor,
    },
  },
  Favorites: {
    screen: FavNavigator, //We can use screen stacks as screens.
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
      tabBarColor: Colors.accentColor,
    },
  },
};

// The BOTTOM NAVIGATOR
//MealsFavTabNavigator has the MealsNavigator stack nested in it!
//Therefore when we export createAppContainer, we should pass this as the param
const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: "white",
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor,
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans-bold",
          },
          activeTintColor: Colors.accentColor,
        },
      });

const FilterNavigator = createStackNavigator(
  { Filters: FiltersScreen },
  {
    navigationOptions: {
      drawerLabel: "Filters",
      drawerIcon: (
        <Ionicons
          name="ios-star"
          size={25}
          color={Colors.accentColor} //automatically grabbed color from activeTintColor
        />
      ),
    },
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

// side Drawer
const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals",
        drawerIcon: (
          <Ionicons
            name="ios-restaurant"
            size={25}
            color={Colors.accentColor} //automatically grabbed color from activeTintColor
          />
        ),
      },
    },
    Filters: FilterNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: { fontFamily: "open-sans-bold" },
    },
  }
);

export default createAppContainer(MainNavigator);
