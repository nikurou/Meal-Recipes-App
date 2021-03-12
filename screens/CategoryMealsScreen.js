import React from "react";
import { StyleSheet, Text, View, FlatList, Platform } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import Colors from "../constants/Colors";
import MealItem from "../components/MealItem";

const CategoryMealsScreen = (props) => {
  const categoryId = props.navigation.getParam("categoryId");

  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  );

  const renderMealItem = (itemData) => {
    return (
      <MealItem
        itemData={itemData}
        image={itemData.item.imageUrl}
        onSelectMeal={(meal) => {
          props.navigation.navigate({
            routeName: "MealDetail",
            params: { mealId: itemData.item.id },
          });
        }}
      ></MealItem>
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});

export default CategoryMealsScreen;
