import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Text, View, Button,Image, Pressable, _ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const onPressGetStarted = () => {
    //console.info("I was pressed");
    navigation.replace("Login");
  };
  return (
    // Welcome Screen Design Start
      <ScrollView className={"flex-1 w-full bg-white  "}>
          <View className="flex items-center " >
            <Image source={require('../assets/Images/logo.png')}  style={{ width: 150, height: 150, marginTop: 80 }}/>
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
  );
};
export default WelcomeScreen;
