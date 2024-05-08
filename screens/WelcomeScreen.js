import React from 'react';
import { View, StyleSheet } from 'react-native';

const SkyBlueCircles = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle1}></View>
      <View style={styles.circle2}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 170, // Adjust the width of the container
    height: 200, // Adjust the height of the container
    backgroundColor: 'transparent',
  },
  circle1: {
    position: 'absolute',
    width: 140, // Adjust the width of the first circle
    height: 140, // Adjust the height of the first circle
    borderRadius: 70, // To make it a circle
    backgroundColor: '#87CEEB', // Sky blue color
    opacity: 0.4,
    top: -30,
    left: 0,
  },
  circle2: {
    position: 'absolute',
    width: 140, // Adjust the width of the second circle
    height: 140, // Adjust the height of the second circle
    borderRadius: 70, // To make it a circle
    backgroundColor: '#87CEEB', // Sky blue color
    opacity: 0.4,
    top: 50, // Adjust for overlap
    left: -60, // Adjust for overlap
  },
});

export default SkyBlueCircles;
