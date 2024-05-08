// import React from 'react';
// import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';

const RegisterScreen = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Password and confirm password do not match!');
            return;
        }
        
        // Here you can perform further validation or send the form data to a server
        // Example: Send form data to server using fetch API
        // fetch("your-server-endpoint", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         fullName: fullName,
        //         email: email,
        //         password: password
        //     }),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        // .then(response => response.json())
        // .then(data => {
        //     // Handle server response if needed
        //     console.log(data);
        // })
        // .catch(error => {
        //     console.error("Error:", error);
        // });
    };

    const handleSignIn = () => {
        // Your sign-in logic here
        console.log("Sign in clicked");
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
            <Image source={('./logo.png')} style={{ width: 100, height: 100 }} />
            <Text style={{fontSize:18,  marginBottom: 10, color:'#000000', fontStyle:'poppins'}}>Welcome Onboard!</Text>
            <Text style={{fontSize:14,  marginBottom: 30, color:'#7575759', fontStyle:'poppins'}}>Please fill out the form below to register:</Text>
            <TextInput
                style={{ height: 40, width:325, borderRadius:50, backgroundColor:'#f5f5f5'
                , marginBottom: 10, paddingHorizontal: 10, color:'#808080' }}
                placeholder="Enter your full name"
                onChangeText={text => setFullName(text)}
                value={fullName}
            />
            <TextInput
                style={{ height: 40, width:325, borderRadius:50, backgroundColor:'#f5f5f5',  marginBottom: 10, paddingHorizontal: 10, color:'#808080' }}
                placeholder="Enter your email"
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput
                style={{ height: 40, width:325, borderRadius:50, backgroundColor:'#f5f5f5',  marginBottom: 10, paddingHorizontal: 10, color:'#808080' }}
                placeholder="Enter password"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <TextInput
                style={{ height: 40, width:325, borderRadius:50, backgroundColor:'#f5f5f5',  marginBottom: 10, paddingHorizontal: 10, color:'#808080' }}
                placeholder="Confirm password"
                onChangeText={text => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry
            />
            <View style={{ height: 30, width: 325, borderRadius: 99, overflow: 'hidden' }}>
            <Button
              
                title="Register"
                color="#3EB489"
                
                

                onPress={handleRegister}
            />
            </View>
            <Text style={{fontSize:14,  marginBottom: 10, color:'#000000', fontStyle:'poppins'}}>Already have an account?
            <TouchableOpacity onPress={handleSignIn}>
            <Text style={{fontSize:14,  marginBottom: 10, color:'blue', fontStyle:'poppins'}}>Sign in</Text>
            </TouchableOpacity>
            </Text>
            
        </View>
    );
};

export default RegisterScreen;