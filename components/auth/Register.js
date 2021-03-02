import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
                    name,
                    email,
                });
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <View>
            <TextInput placeholder='name' onChangeText={(name) => setName(name)} />
            <TextInput placeholder='angelo@telenet.be' onChangeText={(email) => setEmail(email)} />
            <TextInput secureTextEntry onChangeText={(password) => setPassword(password)} />
            <Button title='Sign Up' onPress={() => onSignUp()} />
        </View>
    );
};

export default Register;
