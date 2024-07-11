import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';

const SettingsScreen = () => {
    return (
        <SafeAreaView className={'flex-1 items-center '}>
            <Text className="font-bold text-2xl mt-7">Settings screen</Text>
            <StatusBar style='auto' />
        </SafeAreaView>
    );
}

export default SettingsScreen;