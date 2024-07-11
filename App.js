import 'react-native-gesture-handler';
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { IconButton } from 'react-native'

import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import BottomNavigator from "./src/screens/BottomNavigator";
import HeaderComponent from './src/shared/HeaderComponent';

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
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
};

export default App;