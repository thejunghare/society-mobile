import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper'

const ForgotScreenThree = () => {
  return (
    <SafeAreaView className={'bg-white'}>
      <View className={'h-screen flex justify-between'}>
        <View className={'h-3/6 mx-5 flex  justify-around'}>

          <View>
            <Text className={'text-center text-2xl'}>Reset Password?</Text>
            <Text className={'text-sm text-center text-slate-400'}>
              You are step away from accessing your account!
            </Text>
          </View>

          <View>
            <TextInput
              placeholder='New password'
              mode='outlined'
              label='New password'
              className={'bg-society-offwhite my-1.5'}
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
              left={<TextInput.Icon icon="account-lock" />}
            />

            <TextInput
              placeholder='Confirm password'
              mode='outlined'
              label='Confirm password'
              className={'bg-society-offwhite my-1.5'}
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
              left={<TextInput.Icon icon="account-lock" />}
            />

            <Button
              icon=''
              mode='elevated'
              buttonColor='#3EB489'
              textColor='white'
              className={'mt-2'}
            >
              Reset
            </Button>
          </View>

        </View>

        <View className={'h-28 border-t border-slate-200'}>
          <Text className={'p-3 text-sm font-semibold text-center'}>
            Already have an account?
            <Text className={'text-society-green'}> Sign in</Text>
          </Text>
        </View>

      </View>

      <StatusBar style='auto' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default ForgotScreenThree;
