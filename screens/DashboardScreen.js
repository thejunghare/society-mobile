import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Text, View ,_ScrollView,Image,Button,TextInput} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

 const DashboardScreen = () =>{
  const navigation = useNavigation();
  const onPressGetStarted = () => {
    //console.info("I was pressed");
    navigation.replace("Dashboard");
  };

  return (
  <View className="flex items-center " >
    <Text className="text-lg">DashboardScreen</Text> 
  </View>
  );
 
}

export default DashboardScreen
