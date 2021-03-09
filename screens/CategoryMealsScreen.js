import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const CategoryMealsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>This is CategoryMealsScreen</Text>
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
