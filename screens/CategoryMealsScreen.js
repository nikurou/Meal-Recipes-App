import React from "react";
import { StyleSheet, Text, View, Button, Platform } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import Colors from "../constants/Colors";

const CategoryMealsScreen = (props) => {
  const categoryId = props.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find(
    (category) => category.id === categoryId
  );

  return (
    <View style={styles.screen}>
      <Text>This is CategoryMealsScreen</Text>
      <Text>{selectedCategory.title}</Text>
      <View style={styles.buttonStyle}>
        <Button
          title="Go to Meals Details"
          onPress={() => {
            props.navigation.navigate("MealDetail");
          }}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button
          title="Go Back"
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      </View>
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
  },
  buttonStyle: {
    margin: 5,
  },
});

export default CategoryMealsScreen;
