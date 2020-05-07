import React from 'react';
import { createStore, combineReducers } from  'redux';
import { Provider } from 'react-redux';
import productReducer from  './store/reducers/products';
import ShopNavigator from "./navigation/ShopNavigator";
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/orders';

const rootReducer = combineReducers({
    products : productReducer,
    cart : cartReducer,
    orders:orderReducer
});

const store = createStore(rootReducer);

export default function  App() {

  return(
      <Provider store={store}>
           <ShopNavigator/>
      </Provider>
  );
};
