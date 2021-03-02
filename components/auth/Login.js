import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignUp = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <View>
            <TextInput placeholder='angelo@telenet.be' onChangeText={(email) => setEmail(email)} />
            <TextInput secureTextEntry onChangeText={(password) => setPassword(password)} />
            <Button title='Log In' onPress={() => onSignUp()} />
        </View>
    );
};

export default Login;
