import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View className={"flex-1 items-center"}>
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate("Reset Password");
        }}
      />

      <StatusBar style="dark" />
    </View>
  );
};

export default LoginScreen;
