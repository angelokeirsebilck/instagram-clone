import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';
import { fetchUser, fetchUserPosts } from '../redux/actions/index';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import FeedScreen from '../components/main/Feed';
import ProfileScreen from '../components/main/Profile';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EmptyScreen = () => {
    return null;
};

const Tab = createMaterialBottomTabNavigator();

const Main = ({ fetchUser, fetchUserPosts, user }) => {
    useEffect(() => {
        fetchUser();
        fetchUserPosts();
    }, []);

    return (
        <Tab.Navigator
            // tabBarOptions={{
            //     activeTintColor: 'red',
            // }}
            initialRouteName='Feed'
            labeled={false}>
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

export default connect(mapStateToProps, { fetchUser, fetchUserPosts })(Main);
