// store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore , persistReducer } from 'redux-persist';


 

const persistConfig = {
  key : 'root',
  storage
}

const rootReducer =  combineReducers({
  user : userSlice,
})

const persist = persistReducer(persistConfig ,rootReducer)


const store = configureStore ({
  reducer : persist
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;