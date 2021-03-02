import firebase from 'firebase';
import { USER_STATE_CHANGE } from '../constants/index';

export const fetchUser = () => (dispatch) => {
    return firebase
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
