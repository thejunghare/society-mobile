import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import WelcomeStack from './screens/WelcomeStack';

 const App =() =>{
  return (
    <View className='flex-1'>
         <WelcomeStack/>
    </View>
    
  );
}

export default App