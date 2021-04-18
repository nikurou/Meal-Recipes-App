import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/actions/meals";

// Component used to render the individual steps and ingredients
const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText> {props.children}</DefaultText>
    </View>
  );
};

const MealDetailsScreen = (props) => {
  const availableMeals = useSelector((state) => state.meals.meals);
  const mealId = props.navigation.getParam("mealId"); //fetch mealID
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId); //find the meal with the ID

  const currentMealisFavorited = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );

  //This is how we CALL an action from reducer
  const dispatch = useDispatch();
  //use callback helps prevent infi loop
  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  //Since this changes props and triggers a re-render, we'd get an infinite loop, so we wrap it with useEffect
  useEffect(() => {
    //props.navigation.setParams({ mealTitle: selectedMeal.title });
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealisFavorited });
  }, [currentMealisFavorited]);

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
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}

      <Text style={styles.title}>Steps</Text>
      {/*List of Steps*/}
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

//Header Title and Styling that is dynamic based on Changing Data
// RN automatically passes in navigationData you use navigationOptions as a function.
MealDetailsScreen.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam("mealId");
  //const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const toggleFavorite = navigationData.navigation.getParam("toggleFav");

  //This parameter is set in mealList.js component itself.
  const mealTitle = navigationData.navigation.getParam("mealTitle");

  //MealList.js sets this as well, though its passed from above too.
  //Although redundant, this is so it instantly renders on load and still toggles state.
  const isFavorite = navigationData.navigation.getParam("isFav");

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavorite}
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
  listItem: {
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    padding: 10,
  },
});

export default MealDetailsScreen;
