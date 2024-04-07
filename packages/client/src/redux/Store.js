// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import pxBoardReducer from './pxBoard/pxBoardSlice';
import userReducer from './user/userSlice'
import statReduce from './stat/statSlice'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'root',
  version: 3,
  storage,
};

const rootReducer = combineReducers({
  pxBoard: pxBoardReducer,
  user: userReducer,
  stat:statReduce
});



const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export const persistor = persistStore(store);
