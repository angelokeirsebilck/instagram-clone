import firebase from 'firebase';
import {
    USER_STATE_CHANGE,
    USER_POSTS_STATE_CHANGE,
    USER_FOLLOWING_STATE_CHANGE,
    USERS_DATA_STATE_CHANGE,
    USERS_POSTS_STATE_CHANGE,
    USERS_LIKES_STATE_CHANGE,
    CLEAR_DATA,
} from '../constants/index';

export const fetchUser = () => (dispatch) => {
    firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists) {
                dispatch({
                    type: USER_STATE_CHANGE,
                    currentUser: snapshot.data(),
                });
            } else {
                console.log('Does not exist.');
            }
        });
};

export const fetchUserPosts = () => (dispatch) => {
    firebase
        .firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection('userPosts')
        .orderBy('creation', 'asc')
        .get()
        .then((snapshot) => {
            let posts = snapshot.docs.map((doc) => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data };
            });
            dispatch({ type: USER_POSTS_STATE_CHANGE, payload: posts });
        });
};

export const fetchUserFollowing = () => (dispatch) => {
    firebase
        .firestore()
        .collection('following')
        .doc(firebase.auth().currentUser.uid)
        .collection('userFollowing')
        .onSnapshot((snapshot) => {
            let following = snapshot.docs.map((doc) => {
                const id = doc.id;
                return id;
            });
            dispatch({ type: USER_FOLLOWING_STATE_CHANGE, payload: following });
            for (let i = 0; i < following.length; i++) {
                dispatch(fetchUsersData(following[i], true));
            }
        });
};

export const fetchUsersData = (uid, getPosts) => (dispatch, getState) => {
    const found = getState().users.users.some((el) => el.uid === uid);
    if (!found) {
        firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    let user = snapshot.data();
                    user.uid = snapshot.id;

                    dispatch({ type: USERS_DATA_STATE_CHANGE, user });
                } else {
                    console.log('does not exist');
                }
            });
        if (getPosts) {
            dispatch(fetchUsersFollowingPosts(uid));
        }
    }
};

export const fetchUsersFollowingPosts = (uid) => (dispatch, getState) => {
    firebase
        .firestore()
        .collection('posts')
        .doc(uid)
        .collection('userPosts')
        .orderBy('creation', 'asc')
        .get()
        .then((snapshot) => {
            // console.log(snapshot.query);
            // const uid = snapshot.query.EP.path.segments[1];
            const user = getState().users.users.find((el) => el.uid === uid);

            let posts = snapshot.docs.map((doc) => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data, user };
            });

            for (let i = 0; i < posts.length; i++) {
                dispatch(fetchUsersFollowingLikes(uid, posts[i].id));
            }
            dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid });
        });
};

export const fetchUsersFollowingLikes = (uid, postId) => (dispatch, getState) => {
    firebase
        .firestore()
        .collection('posts')
        .doc(uid)
        .collection('userPosts')
        .doc(postId)
        .collection('likes')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((snapshot) => {
            // const postId = snapshot.ZE.path.segments[3];

            let currentUserLike = false;
            if (snapshot.exists) {
                currentUserLike = true;
            }

            dispatch({ type: USERS_LIKES_STATE_CHANGE, postId, currentUserLike });
        });
};
