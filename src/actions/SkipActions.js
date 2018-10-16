import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  SKIP_CHANGE,
  SKIP_CREATE,
  SKIPS_FETCH_SUCCESS,
  SKIP_SAVE_SUCCESS
} from './types';

export const skipChange = ({ prop, value }) => {

  return {
    type: SKIP_CHANGE,
    payload: { prop, value }
  };
};

export const skipCreate = ({ code }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/skips`)
      .push({ code })
      .then(() => {
        dispatch({ type: SKIP_CREATE });
        Actions.pop()
      });
  };
};

export const skipsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/skips`)
      .on('value', snapshot => {
        dispatch({ type: SKIPS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const skipSave = ({ code, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/skips/${uid}`)
      .set({ code })
      .then(() => {
        dispatch({ type: SKIP_SAVE_SUCCESS });
        Actions.pop()
      });
  };
};

export const skipDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/skips/${uid}`)
      .remove()
      .then(() => {
        Actions.pop()
      });
  };
};
