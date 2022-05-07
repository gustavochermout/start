export enum AuthTypes {
  SET_AUTH = 'SET_AUTH',
}

export interface AuthState {
  email: string;
  name: string;
}