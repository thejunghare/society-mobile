import { createStackNavigator } from '@react-navigation/stack';
// new add
import { NavigationContainer } from '@react-navigation/native';
// import Screens
import WelcomeScreen from './WelcomeScreen'
import LoginScreen from './LoginScreen'

const Stack = createStackNavigator();

const WelcomeStack = () =>{
  return (
    // new add NavigationContainer
    <NavigationContainer>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </NavigationContainer>
    
  );
}
export default WelcomeStack 