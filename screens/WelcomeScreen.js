import { StatusBar } from 'expo-status-bar';
import { Text, View,Button } from 'react-native';

 const WelcomeScreen = () =>{
      const onPressGetStarted = () =>{
           console.log('I was pressed')
  }
  return (
    <View>
      <Button
  onPress={onPressGetStarted}
  title="Get Started"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"/>
      <Text className="text-red-50">Welcome Screen</Text>
    </View>
    
  );
}

export default WelcomeScreen