import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const Profile = () => {
    const logOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log('Sign Out Succes.');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <View>
            <Text>Profile</Text>
            <Button title='Log Out' onPress={() => logOut()} />
        </View>
    );
};

const styles = StyleSheet.create({});

export default Profile;
