import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
// import WelcomeStack from './screens/welcomeStack';

// mport WelcomeScreen from './screens/welcomeScreen';
 import RegisterScreen from './screens/RegisterScreen';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      {/* Render the WelcomeStack component */}
      <RegisterScreen />
      {/* <WelcomeStack /> */}
      {/* Alternatively, you can render individual screens like this */}
      {/* <WelcomeScreen /> */}
    </View>
  );
}

export default App;
