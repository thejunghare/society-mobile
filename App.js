import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ForgotScreenThree from "./screens/ForgotScreenThree";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" options={{headerShown:false}} component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Reset Password"  component={ForgotScreenThree} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
