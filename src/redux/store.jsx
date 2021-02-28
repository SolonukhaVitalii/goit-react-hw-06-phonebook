import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './contacts/contacts-reducer';
import filterReducer from './contacts/contacts-reducer';

const contactsPersistConfig = {
    key: 'contacts',
    storage,
    blacklist: ['filter'],
};

const middleware = [...getDefaultMiddleware(), logger];
const rootReducer = combineReducers({
    contacts: contactsReducer,
    filter: filterReducer,
});
const persistedReducer = persistReducer(contactsPersistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware,
    devTools: process.env.NODE_ENV === 'development',
});
const persistor = persistStore(store);

const Store = { store, persistor };

export default Store;
