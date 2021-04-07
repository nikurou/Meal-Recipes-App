import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MealItem from "./MealItem";

const MealList = (props) => {
  //Hold the list of all the favorite meals as a dictionary.
  const [favorites, setFavorites] = useState(new Map());

  const handleFavorite = (mealObject) => {
    //If it's already in the list of favorites, that means the user is unfavoriting, so delete the entry.
    if (favorites.has(mealObject.title))
      setFavorites(favorites.delete(mealObject.title));
    // else add it as true
    else setFavorites(favorites.set(mealObject.title, { status: true }));
  };

  const renderMealItem = (itemData) => {
    return (
      <MealItem
        itemData={itemData}
        image={itemData.item.imageUrl}
        onSelectMeal={(meal) => {
          props.navigation.navigate({
            routeName: "MealDetail",
            params: {
              mealId: itemData.item.id,
              favoriteDictionary: favorites,
              handleFavorite: handleFavorite,
            },
          });
        }}
      ></MealItem>
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});
export default MealList;
