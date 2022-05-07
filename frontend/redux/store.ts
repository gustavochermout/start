import { createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  stateReconciler: autoMergeLevel1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const ReduxStore = createStore(persistedReducer, composeWithDevTools());

export const Persistor = persistStore(ReduxStore);