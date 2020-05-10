import React from 'react';
import { createStore, combineReducers, applyMiddleware } from  'redux';
import { Provider } from 'react-redux';
import productReducer from  './store/reducers/products';
import ShopNavigator from "./navigation/ShopNavigator";
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/orders';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
    products : productReducer,
    cart : cartReducer,
    orders:orderReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function  App() {

  return(
      <Provider store={store}>
           <ShopNavigator/>
      </Provider>
  );
};
