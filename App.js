import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import WelcomeStack from './screens/WelcomeStack';

 const App =() =>{
  return (
    <View className='flex-1'>
         <WelcomeStack/>
         {/*<Text className="text-black-50">Welcome Screen</Text>*/}
    </View>  
  );
}
export default App