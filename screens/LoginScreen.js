import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Text, View, _ScrollView, Image, Button, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const LoginScreen = () => {
  const navigation = useNavigation();
  const onPressGetStarted = () => {
    //console.info("I was pressed");
    navigation.replace("Dashboard");
  };

  return (
    // Login Screen Design Start
    <ScrollView className={"flex-1 w-full bg-white  "}>
      <View className="flex items-center " >
        <Image source={require('../assets/Images/logo.png')} style={{ width: 144, height: 150, marginTop: 88 }} />
        <Text className="font-bold text-3xl mt-2">Welcome Back!</Text>
        <Text className=" text-lg mt-4 ">Manage your society bills, </Text>
        <Text className="text-lg "> payments, services, complaints </Text>
      </View>

      <View className="flex items-center " >
        <TextInput style={styles.input}
          placeholder="Enter your email"
        />
        <TextInput style={styles.input}
          placeholder="Enter password"
        />
        <Text style={styles.forgotPasswordText} className=" text-lg mt-14">Forgot Password</Text>
      </View>

      <View className="flex-1 items-center mt-8 mb-14 ">
        <Button
          onPress={onPressGetStarted}
          title="Sign In"
          color="#3EB489"
          disabled={false}
        />
      </View>


      <View style={styles.divider} ></View>
      <View className="flex-1 items-center">
        <Text >Don’t have an account? <Text style={styles.signUpText}>Sign Up</Text></Text>

      </View>
    </ScrollView>

  );

}
const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F2F2F2",
    height: 45,
    width: 255,
    marginTop: 30,
    marginBottom: -15,
    borderRadius: 22,
    padding: 15,
  },
  forgotPasswordText: {
    color: '#50C2C9',
    fontSize: 16,
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#F2F2F2',
    marginVertical: 10,
  },
  signUpText: {
    color: '#50C2C9',
    fontSize: 16,
  },
});
export default LoginScreen
