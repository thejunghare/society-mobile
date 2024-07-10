import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {Divider } from 'react-native-paper';
import { StyleSheet,Text, View ,SafeAreaView,_ScrollView,TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";

 const DashboardScreen = () =>{
  const navigation = useNavigation();
  const onPressGetStarted = () => {
    //console.info("I was pressed");
    navigation.replace("Dashboard");
  };

  return (
    <SafeAreaView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Text style={styles.totalDueText}>Total Due</Text>
        <Text style={styles.overdueText}>OverDue</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.totalAmount}>500</Text>
        <Text style={styles.dueDate}>22-03-2024</Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.cardRow}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.transactionHistory}>Transaction History</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.payNow}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.iconContainer}>
      <TouchableOpacity style={styles.iconBox} onPress={() => {}}>
        <Text style={styles.icon}>📄</Text>
        <Text style={styles.icontext}>My Details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconBox} onPress={() => {}}>
        <Text style={styles.icon}>🏠</Text>
        <Text style={styles.icontext}>My Society</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconBox} onPress={() => {}}>
        <Text style={styles.icon}>🛠️</Text>
        <Text style={styles.icontext}>Help Desk</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  );
 
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    width: '87%',
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
    padding: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    marginBottom: 36,
    marginLeft: 22,
    marginRight: 22,
    marginTop: 30,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalDueText: {
    color: '#BA954D',
    fontWeight: 'bold',
    fontSize: 20,
  },
  overdueText: {
    color: '#DC4545',
    fontWeight: 'bold',
    fontSize: 20,
  },
  totalAmount: {
    color: '#3EB489',
    fontSize: 32,
    fontWeight: 'bold',
  },
  dueDate: {
    fontSize: 24,
    color: '#3EB489',
    fontWeight: 'semibold',
  },
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light gray color
    height: 1,
    marginHorizontal: 3,
    marginBottom: 8,
},
  transactionHistory: {
    color: '#A4C897',
    fontWeight: 'bold',
    fontSize: 20,
  },
  payNow: {
    color: '#A4C897',
    fontWeight: 'bold',
    fontSize: 20,
    
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginLeft: 18,
    marginRight: 18,
  },
  iconBox: {
    width: '28%',
    height: 88,
    backgroundColor: '#EBE4E4',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    
  },
  icon: {
    color: '#332D2D',
    fontWeight: 'bold',
    fontSize: 44,
  },
  icontext: {
    paddingTop: 8,
    color: '#332D2D',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
export default DashboardScreen;
