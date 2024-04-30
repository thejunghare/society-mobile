import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

 const WelcomeScreen = () =>{
  return (
    <View>
      <Text className="text-red-50">Welcome Screen</Text>
      <StatusBar style="auto" />
    </View>
    
  );
}

export default WelcomeScreen