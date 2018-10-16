import '../../shim';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  PICKER_CHANGE,
  PICKER_CREATE,
  PICKERS_FETCH_SUCCESS,
  PICKER_SAVE_SUCCESS
} from './types';
import eosjs from 'eosjs';


const KEY =
  [ "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
    "5Hx1SNioqdBPaZgLJbXQmenoPSjfjutEvKJUCUHV9c7d8McnhgE",
    "5K5K4ApoBpHvfj9XJduBs37ZHjZ2QbFGiCeLyM6PofeM8bkNLtG",
    "5K5mbbJq1zPd1WrHCep7PWKEy2CDQGePQ4D65nm2YDbQvh7ft58",
    "5HumA8hBBf9VK6KEtvcPVUt188B7AdjVcCnionxcEtXVDkyqu4j"];
/*
  Local test node accounts

  cleos alias

  alias cleos='docker exec -it nodeos /opt/eosio/bin/cleos --url http://127.0.0.1:8888 --wallet-url http://172.19.0.3:9876'

  cleos create account eosio randomwallet EOS8d2oQz3UPP2ZCdrV7b4vyfs9ENTHkQEsajUGUVBAbHhW5UjfsA EOS6HCFb2g4aZGsHZVhmAaCXBgfqFRecUu3CgyCWqW4cR4vckNSQy

  cleos create account eosio randomacctaa EOS7mfAsJp2N3YLF6Wch2cmnwwBgoN1X9wVgNidUVZi73hc1qDfhT EOS7mfAsJp2N3YLF6Wch2cmnwwBgoN1X9wVgNidUVZi73hc1qDfhT
  cleos create account eosio randomacctab EOS6fbcgaNFbMF9XZoVJuFSpDvTC8R6pkwM7hmBBdN74yefyPtpKb EOS6fbcgaNFbMF9XZoVJuFSpDvTC8R6pkwM7hmBBdN74yefyPtpKb
  cleos create account eosio randomacctac EOS8V6YEiYCf6SUt8aVtys3PGXQbfGR6Tg2WeqQif91XdRgN34Kxn EOS8V6YEiYCf6SUt8aVtys3PGXQbfGR6Tg2WeqQif91XdRgN34Kxn
  cleos create account eosio randomacctad EOS71F9uUmHXhEU4ZwiqFhYfZYb8w4AJYXAWqEbsBJxSR6ZB9hkex EOS71F9uUmHXhEU4ZwiqFhYfZYb8w4AJYXAWqEbsBJxSR6ZB9hkex

  cleos push action user.token issue '[ "randomwallet", "2000.00 ZAR", "memo" ]' -p user
  cleos push action user.token issue '[ "randomacctaa", "20.00 ZAR", "memo" ]' -p user
  cleos push action user.token issue '[ "randomacctab", "15.00 ZAR", "memo" ]' -p user
  cleos push action user.token issue '[ "randomacctac", "10.00 ZAR", "memo" ]' -p user
  cleos push action user.token issue '[ "randomacctad", "5.00 ZAR", "memo" ]' -p user

  cleos get table user.token randomwallet accounts
  cleos get table user.token randomacctaa accounts
  cleos get table user.token randomacctab accounts
  cleos get table user.token randomacctac accounts
  cleos get table user.token randomacctad accounts

 */

//const RPC_API_URL = "http://eos.eosza.io:8888";
const RPC_API_URL = "http://127.0.0.1:8888";
//const RPC_API_URL = "http://jungle.cryptolions.io:18888";

export function eos(){
  config = {
    keyProvider: KEY, // WIF string or array of keys..
    httpEndpoint: RPC_API_URL
  }

  local_net = eosjs(config);
  return local_net
}


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
    firebase.database().ref(`/users/${currentUser.uid}/pickers`)
      .on('value', snapshot => {
        dispatch({ type: PICKERS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
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

  return (dispatch) => {
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
  };
};
