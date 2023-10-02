import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { userSliceReducer } from './user/userSlice';
import { persistStore } from 'redux-persist';
import { businessSLiceReducer } from './Business/businessSlice';
import {adminSLiceReducer} from './Admin/adminSlice'

//Define a redux persist configuration
// const persistConfig = {
//     key: 'root',
//     storage,
// }

// const persistedUserReducer = persistReducer(persistConfig,userSliceReducer)
// const persistedBusinessReducer = persistReducer(persistConfig,businessSLiceReducer)
// const persistedAdminReducer = persistReducer(persistConfig,adminSLiceReducer)


const rootReducer = combineReducers({
    user: userSliceReducer,
    business: businessSLiceReducer,
    admin: adminSLiceReducer,
  });

//   const persistedReducer = persistReducer(persistConfig, rootReducer);


const store =configureStore({
    reducer:{
        rootReducer, // Use the persisted root reducer
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware()
    .concat(apiSlice.middleware),
    devTools:true
});

export const persistor = persistStore(store)
export default store