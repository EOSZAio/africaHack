import '../../shim';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  PICKER_CHANGE,
  PICKER_CREATE,
  PICKERS_FETCH_SUCCESS,
  PICKER_SAVE_SUCCESS
} from './types';
import { getTableData } from '../utils/eosjs-client';


export const pickerChange = ({ prop, value }) => {
  return {
    type: PICKER_CHANGE,
    payload: { prop, value }
  };
};

export const pickerCreate = ({ name, image, account, owner_private, active_private }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/pickers`)
      .push({ name, image, account, owner_private, active_private })
      .then(() => {
        dispatch({ type: PICKER_CREATE });
        Actions.pop()
      });
  };
};

export const pickersFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    getTableData("freecycle", "freecycle", "members").then( result =>{
      console.log("bc: ", result);
      dispatch({ type: PICKERS_FETCH_SUCCESS, payload: result.rows });
    }).catch(err => {
      console.log("data",err);
    });;
  };

  /*return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/pickers`)
      .on('value', snapshot => {
        dispatch({ type: PICKERS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };*/
};

export const pickerSave = ({ name, image, account, owner_private, active_private, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/pickers/${uid}`)
      .set({ name, image, account, owner_private, active_private })
      .then(() => {
        dispatch({ type: PICKER_SAVE_SUCCESS });
        Actions.pop()
      });
  };
};

export const pickerDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/pickers/${uid}`)
      .remove()
      .then(() => {
        Actions.pop()
      });
  };
};

export const pickerGetBalance = ({ account }) => {

  /*return (dispatch) => {
    // cleos -u http://eos.eosza.io:8888/ get currency balance eosio.token rorymapstone
    // eos().getCurrencyBalance('eosio.token', account, 'EOS')
    eos().getCurrencyBalance('user.token', account, 'ZAR')
      .then (response => {
        console.log('===> pickerGetBalance', account, response);
        dispatch ({
          type: PICKER_CHANGE,
          payload: { prop: 'balance', value: response }
        });
      });
  };*/
};
