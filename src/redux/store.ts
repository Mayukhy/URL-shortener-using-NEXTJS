import { configureStore,combineReducers,getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import urlReducer from './slices/urlSlice'

import { urlShortAPI } from './api/api';


export const store = configureStore({
  reducer:
  { 
    user: userReducer,
    url:urlReducer,
    [urlShortAPI.reducerPath]: urlShortAPI.reducer },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(urlShortAPI.middleware),
    
});

