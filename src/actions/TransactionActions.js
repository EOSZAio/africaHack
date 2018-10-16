import {
  TRANSACTION_CHANGE
} from './types';

export const transactionChange = ({ prop, value }) => {
  return {
    type: TRANSACTION_CHANGE,
    payload: { prop, value }
  };
};
