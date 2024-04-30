import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

 const LoginScreen = () =>{
  return (
    <View>    
      <Text className="text-red-50"> Login Screen</Text>
      <StatusBar style="auto" />
    </View>
    
  );
}

export default LoginScreen