import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import {
  cartReducer
} from './reducers/cartReducers';

import { 
  essayBrowseReducer,
  essayCoinCreateReducer,
  essayCreateReducer, 
  essayDeleteForceReducer, 
  essayDeleteReducer, 
  essayDeleteSoftReducer, 
  essayDetailsReducer, 
  essayHideReducer, 
  essayListReducer, 
  essayListTrarhReducer, 
  essayRestoreReducer, 
  essayUpdateReducer
} from './reducers/essayReducers';

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderSummaryReducer
} from './reducers/orderReducers';

import {
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productUpdateReducer,
} from './reducers/productReducers';

import {
  userAddressMapReducer,
  userCoinCreateReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userTopSellerReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo') ?
      JSON.parse(localStorage.getItem('userInfo')) :
      null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems') ?
      JSON.parse(localStorage.getItem('cartItems')) :
      [],
    shippingAddress: localStorage.getItem('shippingAddress') ?
      JSON.parse(localStorage.getItem('shippingAddress')) :
      {},
    paymentMethod: 'PayPal',
  },
};
const reducer = combineReducers({
  cart: cartReducer,


  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productCategoryList: productCategoryListReducer,
  productReviewCreate: productReviewCreateReducer,


  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer, 
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  orderSummary: orderSummaryReducer,
  

  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userTopSeller: userTopSellerReducer,
  userCoinCreate:userCoinCreateReducer,
  userAddressMap: userAddressMapReducer,
  

  essayList: essayListReducer,
  essayCreate:essayCreateReducer,
  essayDetails: essayDetailsReducer,
  essayUpdate: essayUpdateReducer,
  essayDeleteSoft:essayDeleteSoftReducer,
  essayListTrarh: essayListTrarhReducer,
  essayRestore:essayRestoreReducer,
  essayDeleteForce:essayDeleteForceReducer,
  essayDelete:essayDeleteReducer,
  essayBrowse:essayBrowseReducer,
  essayHide:essayHideReducer,
  essayCoinCreate:essayCoinCreateReducer,

});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;