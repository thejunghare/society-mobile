import 'react-native-gesture-handler';
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { IconButton } from 'react-native'

import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
<<<<<<< HEAD
import BottomNavigator from "./screens/BottomNavigator";
import HeaderComponent from './shared/HeaderComponent';
=======
import DashboardScreen from "./screens/DashboardScreen";
>>>>>>> 80e06511c88f73dbfa1d926723b99f941d286e57

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                options={{ headerShown: false }}
                component={WelcomeScreen}
            />

            <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={LoginScreen}
            />

            <Stack.Screen
            name='Dashboard'
                component={BottomNavigator}
                options={{
                   headerTitle:() => <HeaderComponent/>
                }}
            />
        </Stack.Navigator>
    );
}

const App = () => {
<<<<<<< HEAD
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
=======
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
>>>>>>> 80e06511c88f73dbfa1d926723b99f941d286e57
};

export default App;