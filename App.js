import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <View className='flex-1'>
         <WelcomeStack/>
         {/*<Text className="text-black-50">Welcome Screen</Text>*/}
    </View>  
  );
};

export default App;
