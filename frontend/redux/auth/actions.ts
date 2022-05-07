import { action } from 'typesafe-actions';
import { AuthTypes } from './types';

export const setAuth = (payload: {
  email: string;
  name: string;
}) =>
  action(AuthTypes.SET_AUTH, payload);