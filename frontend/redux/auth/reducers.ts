import { AuthState, AuthTypes } from './types';
import { Reducer } from 'redux';

const INITIAL_STATE: AuthState = {
  email: '',
  name: '',
};

const authReducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.SET_AUTH:
      return { ...state, email: action.payload.email, name: action.payload.name }
    default:
      return state;
  }
}

export default authReducer;