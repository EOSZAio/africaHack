import {
  PICKER_CHANGE,
  PICKER_CREATE,
  PICKER_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: 'Test',
  image: '',
  account: '',
  owner_private: '',
  owner_public: '',
  active_private: '',
  active_public: '',
  balance: '0.00'
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case PICKER_CHANGE:
      return { ...state, [action.payload.prop]: action.payload.value };

    case PICKER_CREATE:
      return INITIAL_STATE;

    case PICKER_SAVE_SUCCESS:
//      return INITIAL_STATE;
      return state;

    default:
      return state;
  }
};
