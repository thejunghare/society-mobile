import { createStackNavigator } from '@react-navigation/stack';

// import Screens
import WelcomeScreen from './WelcomeScreen'
import LoginScreen from './LoginScreen'

const Stack = createStackNavigator();

const WelcomeStack = () =>{
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
export default WelcomeStack 