import { combineReducers } from 'redux'
import products from './products';
import propertyGroups from './propertyGroups';

/*PERSIST*/
import { persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

/** BLACKLIST **/
const rootPersistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: ['products', 'propertyGroups'] // list of components which will not be persisted
};

const rootReducer = combineReducers ({
  products,
  propertyGroups
});

export default persistReducer(rootPersistConfig, rootReducer);