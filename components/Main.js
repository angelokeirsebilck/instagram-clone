import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';
import { fetchUser } from '../redux/actions/index';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FeedScreen from '../components/main/Feed';
import ProfileScreen from '../components/main/Profile';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { event } from 'react-native-reanimated';

const EmptyScreen = () => {
    return null;
};

const Tab = createBottomTabNavigator();

const Main = ({ fetchUser, user }) => {
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <Tab.Navigator
            // tabBarOptions={{
            //     activeTintColor: 'red',
            // }}
            initialRouteName='Feed'>
            <Tab.Screen
                name='Feed'
                component={FeedScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialCommunityIcons name='home' color={color} size={26} />;
                    },
                }}
            />
            <Tab.Screen
                name='AddContainer'
                component={EmptyScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialCommunityIcons name='plus-box' color={color} size={26} />;
                    },
                }}
                listeners={({ navigation }) => ({
                    tabPress: (event) => {
                        event.preventDefault();
                        navigation.navigate('Add');
                    },
                })}
            />
            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <MaterialCommunityIcons name='account-circle' color={color} size={26} />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, { fetchUser })(Main);
