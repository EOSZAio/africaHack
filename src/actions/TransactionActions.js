import {
  TRANSACTION_CHANGE
} from './types';
import { transaction } from '../utils/eosjs-client';

export const transactionChange = ({ prop, value }) => {
  return {
    type: TRANSACTION_CHANGE,
    payload: { prop, value }
  };
};
