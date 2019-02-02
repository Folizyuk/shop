import { combineReducers } from 'redux'
import products from './products';
import product from './product';
import modal from './modalReducer';
import user from './user';
import cart from './cart';

/*PERSIST*/
import { persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

/** BLACKLIST **/
const rootPersistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: [
    'products',
    'product',
    'modalReducer',
    'cart',
  ] // list of components which will not be persisted
};

const rootReducer = combineReducers ({
  products,
  product,
  modal,
  user,
  cart,
});

export default persistReducer(rootPersistConfig, rootReducer);