import {
  TRANSACTION_CHANGE,
  TRANSACTION_SUCCESS
} from './types';

export const transactionChange = ({ prop, value }) => {
  return {
    type: TRANSACTION_CHANGE,
    payload: { prop, value }
  };
};


export const transactionSuccess = () => {
  return {
    type: TRANSACTION_SUCCESS
  };
};