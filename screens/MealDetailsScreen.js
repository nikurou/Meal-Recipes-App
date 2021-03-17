import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { MEALS } from "../data/dummy-data";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";

const MealDetailsScreen = (props) => {
  const mealId = props.navigation.getParam("mealId"); //fetch mealID
  const selectedMeal = MEALS.find((meal) => meal.id === mealId); //find the meal with the ID

  return (
    <View style={styles.screen}>
      <Text>{selectedMeal.title}</Text>
      <Button
        title="Go back to Categories"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </View>
  );
};

//Header Title and Styling that is dynamic based on Changing Data
// RN automatically passes in navigationData you use navigationOptions as a function.
MealDetailsScreen.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam("mealId");
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return {
    headerTitle: selectedMeal.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={true ? "ios-star" : "ios-star-outline"}
          onPress={() => {
            console.log("Favorited");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealDetailsScreen;
