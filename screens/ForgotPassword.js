import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');

    const handleRegister = () => {
        // Your registration logic here
    };

    const handleSignIn = () => {
        // Your sign-in logic here
        console.log("Sign in clicked");
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
           
            <Text style={{ fontSize: 18, marginBottom: 10, color: '#000000', fontStyle: 'poppins', textAlign: 'center' }}>Forgot Password?</Text>
            <Text style={{ fontSize: 14, marginBottom: 20, color: '#757575', fontStyle: 'poppins', textAlign: 'center' }}>Enter your email address and we'll send you a OTP to      reset your password.</Text>
            <TextInput
                style={{ height: 40, width: 325, borderRadius: 50, backgroundColor: '#f5f5f5', marginBottom: 20, paddingHorizontal: 10, color: '#808080', textAlign: 'center' }}
                placeholder="Enter your email"
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <View style={{ height: 40, width: 325, borderRadius: 50, overflow: 'hidden', marginBottom: 200 }}>
                <Button
                    title="Send Link"
                    color="#3EB489"
                    onPress={handleRegister}
                />
            </View>
            <Text style={{ fontSize: 14, marginBottom: 10, color: '#000000', fontStyle: 'poppins', textAlign: 'center' }}>Already have an account?
                <TouchableOpacity onPress={handleSignIn}>
                    <Text style={{ fontSize: 14, marginBottom: 10, color: 'blue', fontStyle: 'poppins' }}> Sign in</Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
};

export default RegisterScreen;
