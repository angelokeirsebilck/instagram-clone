import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const Profile = ({ user, users, route }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (users.usersFollowingLoaded == user.following.length && user.following.length !== 0) {
            users.feed.sort(function (x, y) {
                return x.creation - y.creation;
            });
            setPosts(users.feed);
        }
    }, [users.usersFollowingLoaded, users.feed]);

    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View style={styles.containerImage}>
                            <Text style={styles.container}>{item.user.name}</Text>
                            <Image style={styles.image} source={{ uri: item.downloadURL }} />
                            {/* {item.currentUserLike ? (
                                <Button
                                    title='Dislike'
                                    onPress={() => onDislikePress(item.user.uid, item.id)}
                                />
                            ) : (
                                <Button
                                    title='Like'
                                    onPress={() => onLikePress(item.user.uid, item.id)}
                                />
                            )} */}
                            <Text
                                onPress={() =>
                                    props.navigation.navigate('Comment', {
                                        postId: item.id,
                                        uid: item.user.uid,
                                    })
                                }>
                                View Comments...
                            </Text>
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
    users: state.users,
});

export default connect(mapStateToProps)(Profile);
