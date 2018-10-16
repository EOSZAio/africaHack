import {TRANSACTION_CHANGE} from "../actions/types";

const INITIAL_STATE = {
  site_uid: '',
  site_account: '',
  site_owner_private: '',
  site_active_private: '',

  picker_uid: '',
  picker_name: '',
  picker_image: '',
  picker_account: '',
  product_uid: '',
  product_name: '',
  product_image: '',
  product_price: '',
  product_value: '',
  quantity: '',
  skip_uid: '',
  skip_code: '',
  transaction_state: ''
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case TRANSACTION_CHANGE:
      return { ...state, [action.payload.prop]: action.payload.value };

    default:
      return state;
  }
};
