import {
  SETTINGS_CHANGE,
  SETTINGS_CREATE,
  SETTINGS_SAVE_SUCCESS,
  SETTINGS_FETCH_SUCCESS
} from '../actions/types';
import _ from "lodash";

const INITIAL_STATE = {
  name: '',
  account: '',
  owner_private: '',
  owner_public: '',
  active_private: '',
  active_public: ''
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case SETTINGS_CHANGE:
      return { ...state, [action.payload.prop]: action.payload.value };

    case SETTINGS_CREATE:
      return INITIAL_STATE;

    case SETTINGS_SAVE_SUCCESS:
      return INITIAL_STATE;

    case SETTINGS_FETCH_SUCCESS:
      // Map array to object
      const settings = _.map(action.payload, (val, uid) => {
        return { ...val, uid };
      });
      return (settings.length ? settings[0] : INITIAL_STATE);

    default:
      return state;
  }
};
