import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading"; //prolongs apploading until all our fonts/assets are loaded
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import MealsNavigator from "./navigation/MealsNavigator";
import mealsReducer from "./store/reducers/meals";

//Due to Expo SDK 40 having conflicts with React Navigation's use of Constants, I'm forcing ignore on:
//Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo-constants).
//The global "__expo" and "Expo" objects will be removed in SDK 41. Learn more about how to fix this warning: https://expo.fyi/deprecated-globals
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

enableScreens();

// If we had multiple reducers to manage mulitple things, we could use this.
// Though we only have one in this case.
const rootReducer = combineReducers({
  meals: mealsReducer,
});
//Pass the combined reducers to the store
const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setLoaded(true)}
        onError={(err) => console.log(error)}
      />
    );
  }

  //Behind the scenes this now gives us access to the redux state in any screen.
  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
