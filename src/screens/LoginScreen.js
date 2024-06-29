import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Text, View ,Image ,Button ,SafeAreaView ,TextInput} from 'react-native';
import { useNavigation } from "@react-navigation/native";

 const LoginScreen = () =>{
  const navigation = useNavigation();
  const [text, setText] = React.useState("");
  const onPressGetStarted = () => {
    navigation.replace("Dashboard");
  };

  return (
     // Login Screen Design Start
     <SafeAreaView className={"flex-1 max-h-screen bg-white"}>
           <View className="flex items-center max-h-50 " >
                  <Image source={require('../assets/Images/logo.png')}  style={{ width: 124, height: 88, marginTop: 28 }}/>
                  <Text className="font-bold text-3xl mt-2">Welcome Back!</Text> 
                  <Text className=" text-lg mt-4 ">Manage your society bills, </Text>
                  <Text className="text-lg "> payments, services, complaints </Text>  
           </View>
           <View className="flex items-center  max-h-50 mt-36 ">
                 <TextInput
                     backgroundColor="#F2F2F2"
                     placeholder="Enter your email"
                     mode="outlined"
                     label="Email"
                     value={text}
                     onChangeText={text => setText(text)}
                 />
            </View>
           <View className="flex items-center  max-h-50 mt-36 " >
                  <Button 
                    mode="outlined"
                    outlineColor="true"
                    onPress={onPressGetStarted}
                    title="Sign in"
                    color="#3EB489"
                    >
                  </Button> 
           </View>
</SafeAreaView>

  );
}
export default LoginScreen