import { StatusBar } from "expo-status-bar";
import * as React from "react";
<<<<<<< HEAD
import { View,SafeAreaView ,Image ,Text ,Button } from "react-native";
=======
import { Text, View, Button,Image, Pressable, _ScrollView } from "react-native";
>>>>>>> 80e06511c88f73dbfa1d926723b99f941d286e57
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const onPressGetStarted = () => {
    navigation.replace("Login");
  };
  return (
    // Welcome Screen Design Start
<<<<<<< HEAD
    
     <SafeAreaView className={"flex-1 max-h-screen bg-white"}>
                  <View className="flex items-center  max-h-50 mb-12 " >
                          <Image source={require('../assets/Images/logo.png')} 
                           style={{ width: 150, height: 150, marginTop: 50 }}/>
                           <Text className="font-bold text-2xl mt-7">Gets things done with TODO</Text>
                           <Text className=" text-lg mt-4">Lorem ipsum dolor sit amet</Text>
                           <Text className="text-lg">consectetur adipiscing elit. Interdum </Text> 
                           <Text className="text-lg">dictum tempus, interdum at dignissim metus.</Text> 
                  </View> 
                  <View className="flex items-center  max-h-50 mt-36 " >
                               
                           <Button 
                           mode="outlined" 
                           onPress={onPressGetStarted}
                           title="Get Started"
                           color="#3EB489"
                           >

                           </Button> 
                  </View>
      </SafeAreaView>
=======
      <ScrollView className={"flex-1 w-full bg-white  "}>
          <View className="flex items-center " >
            <Image source={require('../assets/Images/Logo.png')}  style={{ width: 150, height: 150, marginTop: 80 }}/>
            <Text className="font-bold text-2xl mt-4">Gets things done with TODO</Text> 
            <Text className=" text-lg mt-4">Lorem ipsum dolor sit amet</Text>
            <Text className="text-lg">consectetur adipiscing elit. Interdum </Text> 
            <Text className="text-lg">dictum tempus, interdum at dignissim metus.</Text> 
          </View>

          <View className="flex-1 items-center mt-40 ">
            <Button 
              onPress={onPressGetStarted}
              title="Get Started"
              color="#3EB489"
              disabled={false}
              />
          </View>
      </ScrollView>
>>>>>>> 80e06511c88f73dbfa1d926723b99f941d286e57
  );
};
export default WelcomeScreen;

