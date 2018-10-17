import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  SETTINGS_CHANGE,
  SETTINGS_CREATE,
  SETTINGS_FETCH_SUCCESS,
  SETTINGS_SAVE_SUCCESS
} from './types';

export const settingsChange = ({ prop, value }) => {
  return {
    type: SETTINGS_CHANGE,
    payload: { prop, value }
  };
};

export const settingsCreate = ({ name, account, owner_private, active_private }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/settings`)
      .push({ name, account, owner_private, active_private })
      .then(() => {
        dispatch({ type: SETTINGS_CREATE });
        Actions.pop()
      });
  };
};

export const settingsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/settings`)
      .on('value', snapshot => {
        dispatch({ type: SETTINGS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const settingsSave = ({ name, account, owner_private, active_private, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/settings/${uid}`)
      .set({ name, account, owner_private, active_private })
      .then(() => {
        dispatch({ type: SETTINGS_SAVE_SUCCESS });
        Actions.pop()
      });
  };
};

export const settingsDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/settings/${uid}`)
      .remove()
      .then(() => {
        Actions.pop()
      });
  };
};
