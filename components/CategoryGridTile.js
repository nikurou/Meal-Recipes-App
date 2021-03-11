import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const CategoryGridTile = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.gridItem}>
      <View style={[styles.container, { backgroundColor: props.color }]}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "pink",
  },
});

export default CategoryGridTile;
