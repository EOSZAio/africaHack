import {
  SKIP_CHANGE,
  SKIP_CREATE,
  SKIP_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  code: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SKIP_CHANGE:
      return { ...state, [action.payload.prop]: action.payload.value };

    case SKIP_CREATE:
      return INITIAL_STATE;

    case SKIP_SAVE_SUCCESS:
      return INITIAL_STATE;

    default:
      return state;
  }
};
