import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Text, View, Button, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const onPressGetStarted = () => {
    //console.info("I was pressed");
    navigation.replace("Login");
  };

  return (
    <View className="flex-1 items-center m-3">
      <Button
        onPress={onPressGetStarted}
        title="Get Started"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

export default WelcomeScreen;
