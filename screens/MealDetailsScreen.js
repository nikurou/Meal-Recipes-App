import React, { useState } from "react";
import {
  ScrollView,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MEALS } from "../data/dummy-data";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";

const MealDetailsScreen = (props) => {
  const mealId = props.navigation.getParam("mealId"); //fetch mealID
  const selectedMeal = MEALS.find((meal) => meal.id === mealId); //find the meal with the ID

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={[styles.mealRow, styles.mealDetail]}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>

      {/*List of Ingredients*/}
      {selectedMeal.ingredients.map((ingredient) => (
        <Text>{ingredient}</Text>
      ))}

      <Text style={styles.title}>Steps</Text>
      {/*List of Steps*/}
      {selectedMeal.steps.map((step) => (
        <Text>{step}</Text>
      ))}
    </ScrollView>
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
  mealRow: {
    flexDirection: "row",
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
  },
});

export default MealDetailsScreen;
