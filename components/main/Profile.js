import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const Profile = ({ user }) => {
    const [userPosts, setUserPosts] = useState([]);
    const [currentUser, setCurrentser] = useState(null);

    useEffect(() => {
        setUserPosts(user.posts);
        setCurrentser(user.currentUser);
    }, []);

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

    if (currentUser === null) {
        return <View></View>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text>{currentUser.name}</Text>
                <Text>{currentUser.email}</Text>

                <Button title='Log Out' onPress={() => logOut()} />
            </View>

            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({ item }) => (
                        <View style={styles.containerImage}>
                            <Image style={styles.image} source={{ uri: item.downloadURL }} />
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 20,
    },
    containerGallery: {
        flex: 1,
    },
    containerImage: {
        flex: 1 / 3,
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1,
    },
});

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Profile);
