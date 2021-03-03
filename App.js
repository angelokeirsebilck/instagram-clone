import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add';
import ProfileSearchScreen from './components/main/ProfileSearch';
import SaveScreen from './components/main/Save';

import {
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID,
} from '@env';

const middlewarde = [thunk];
const inittalState = {};
const store = createStore(
    rootReducer,
    inittalState,
    composeWithDevTools(applyMiddleware(...middlewarde))
);

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App() {
    const [loaded, setLoaded] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                setLoggedIn(false);
                setLoaded(true);
            } else {
                setLoggedIn(true);
                setLoaded(true);
            }
        });
    }, []);

    if (!loaded) {
        return (
            <View style={styles.container}>
                <Text>Loading..</Text>
            </View>
        );
    }

    if (!loggedIn) {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName='Landing'>
                        <Stack.Screen
                            name='Landing'
                            component={LandingScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Register'
                            component={RegisterScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Login'
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Main'>
                    <Stack.Screen name='Main' component={MainScreen} />
                    <Stack.Screen name='Add' component={AddScreen} />
                    <Stack.Screen name='ProfileSearch' component={ProfileSearchScreen} />
                    <Stack.Screen name='Save' component={SaveScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});
