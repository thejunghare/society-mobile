import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { SafeAreaView,ScrollView, Text, View, Button, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const onPressGetStarted = () => {
    //console.info("I was pressed");
    navigation.replace("Login");
  };

  return (
    <SafeAreaView className="flex-1 m-3 bg-white">
      <Button
        onPress={onPressGetStarted}
        title="Get Started"
        color="red"
        disabled={false}
      />
    </SafeAreaView>
  );
};

export default WelcomeScreen;
