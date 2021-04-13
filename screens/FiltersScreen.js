import React, { useState, useEffect, useCallback } from "react";
import { Platform, StyleSheet, Switch, Text, View } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        value={props.value}
        onValueChange={props.handleValueChange}
        trackColor={{ true: Colors.primaryColor, false: "" }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
      />
    </View>
  );
};

const FiltersScreen = (props) => {
  const { navigation } = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      isVegetarian: isVegetarian,
    };

    console.log(appliedFilters);
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

  //On any re-render, this will trigger, SAVING the current state of the filters.
  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]); //Specify to only apply when saveFilters changes because setParams() itself changes prop.

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters/Restrictions</Text>
      <FilterSwitch
        value={isGlutenFree}
        label="Gluten-Free"
        handleValueChange={() => setIsGlutenFree(!isGlutenFree)}
      />
      <FilterSwitch
        value={isLactoseFree}
        label="Lactose-Free"
        handleValueChange={() => setIsLactoseFree(!isLactoseFree)}
      />
      <FilterSwitch
        value={isVegan}
        label="Vegan"
        handleValueChange={() => setIsVegan(!isVegan)}
      />
      <FilterSwitch
        value={isVegetarian}
        label="Vegetarian"
        handleValueChange={() => setIsVegetarian(!isVegetarian)}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filter Meals",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={() => {
            navData.navigation.getParam("save")(); //we set this parameter up earlier to = the saved filter dictionary
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,

    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
});

export default FiltersScreen;
