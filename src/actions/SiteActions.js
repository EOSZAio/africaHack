//import firebase from 'firebase';
//import { Actions } from 'react-native-router-flux';
import {
  SITES_FETCH_SUCCESS
} from './types';

import { getTableData } from '../utils/eosjs-client';

export const sitesFetch = () => {
  
  return (dispatch) => {
    getTableData("freecycle", "freecycle", "sitesettings").then( result =>{
      console.log("bc: ", result);
      dispatch({ type: SITES_FETCH_SUCCESS, payload: result.rows });
    }).catch(err => {
      console.log("data",err);
    });;
  };
};
