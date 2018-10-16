import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  PRODUCT_CHANGE,
  PRODUCT_CREATE,
  PRODUCTS_FETCH_SUCCESS,
  PRODUCT_SAVE_SUCCESS
} from './types';

export const productChange = ({ prop, value }) => {
  return {
    type: PRODUCT_CHANGE,
    payload: { prop, value }
  };
};

export const productCreate = ({ name, image, price }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/products`)
      .push({ name, image, price })
      .then(() => {
        dispatch({ type: PRODUCT_CREATE });
        Actions.pop()
      });
  };
};

export const productsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/products`)
      .on('value', snapshot => {
        dispatch({ type: PRODUCTS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const productSave = ({ name, image, price, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/products/${uid}`)
      .set({ name, image, price })
      .then(() => {
        dispatch({ type: PRODUCT_SAVE_SUCCESS });
        Actions.pop()
      });
  };
};

export const productDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/products/${uid}`)
      .remove()
      .then(() => {
        Actions.pop()
      });
  };
};
