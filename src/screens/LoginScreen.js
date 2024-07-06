import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Text, View, Image, Button, SafeAreaView,TouchableOpacity  } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation();
  
  const onPressGetStarted = () => {
    navigation.replace("Dashboard");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
      >
      <View className="h-screen w-11/12 m-auto flex flex-col justify-around">
        <View className="flex items-center max-h-50">
          <Image 
            source={require('../../assets/Images/Logo.png')}  
            style={{ width: 124, height: 88, marginTop: 28 }} 
          />
          <Text className="font-bold text-3xl mt-3">Welcome Back!</Text> 
          <Text className="text-lg mt-3">Manage your society bills,</Text>
          <Text className="text-lg">payments, services, complaints</Text>  
          <Text className="text-center font-bold text-lg mt-3 mb-14 ">Log in to your account</Text>
        </View>

        <View>
          <PaperTextInput
            label="Enter your email"
            value={email}
            onChangeText={setEmail}
            placeholder="Username"
            textContentType="emailAddress"
            keyboardType="email-address"
            left={<PaperTextInput.Icon icon="account" />} 
            className="mb-4 rounded-3xl"
          />
          <PaperTextInput
            label="Enter password"
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            left={<PaperTextInput.Icon icon="eye" />}
            className="mb-4 rounded-3xl "
          /><TouchableOpacity onPress={(ForgotScreenThree) => {}}>
           <Text className="text-center font-bold text-lg mt-3 text-forgotpass-Teal">Forgot Password</Text>      
           </TouchableOpacity>
        </View>
        
        <View className="max-h-50 mt-36 mb-32 w-52 mx-auto">
          <Button 
            onPress={onPressGetStarted}
            title="Sign in"
            color="#3EB489"
          /> 
        </View>
        <Text className="text-center font-bold text-lg mb-4 text-forgotpass-Teal">Don’t have an account ? Sign Up</Text>
      </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default LoginScreen;
