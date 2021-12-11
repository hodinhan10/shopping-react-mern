import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';


// import AdminRoute from './components/AdminRoute';
// import PrivateRoute from './components/PrivateRoute';
// import CartScreen from './screens/CartScreen';
// import HomeScreen from './screens/HomeScreen';
// import OrderHistoryScreen from './screens/OrderHistoryScreen';
// import OrderScreen from './screens/OrderScreen';
// import PaymentMethodScreen from './screens/PaymentMethodScreen';
// import PlaceOrderScreen from './screens/PlaceOrderScreen';
// import ProductListScreen from './screens/ProductListScreen';
// import ProductScreen from './screens/ProductScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import ShippingAddressScreen from './screens/ShippingAddressScreen';
// import SigninScreen from './screens/SigninScreen';
// import ProductEditScreen from './screens/ProductEditScreen';
// import OrderListScreen from './screens/OrderListScreen';
// import UserListScreen from './screens/UserListScreen';
// import UserEditScreen from './screens/UserEditScreen';
// import SellerRoute from './components/SellerRoute';
// import SellerScreen from './screens/SellerScreen';
// import SearchBox from './components/SearchBox';
// import SearchScreen from './screens/SearchScreen';
// import { listProductCategories } from './actions/productActions';
// import LoadingBox from './components/LoadingBox';
// import MessageBox from './components/MessageBox';
// import MapScreen from './screens/MapScreen';
// import DashboardScreen from './screens/DashboardScreen';
// import EssayList from './screens/essay/EssayList';
// import EssayEdit from './screens/essay/EssayEdit';
// import EssayListTrash from './screens/essay/EssayListTrash';
// import EssayCreate from './screens/essay/EssayCreate';
import { listProductCategories } from './actions/productActions';

import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import LoadingBox from './components/LoadingBox';
import SellerRoute from './components/SellerRoute';


// used lazy
const MessageBox = React.lazy(() => import('./components/MessageBox'));
const SearchBox = React.lazy(() => import('./components/SearchBox'));
const CartScreen = React.lazy(() => import('./screens/CartScreen'));
const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
const OrderHistoryScreen = React.lazy(() => import('./screens/OrderHistoryScreen'));
const OrderScreen = React.lazy(() => import('./screens/OrderScreen'));
const PaymentMethodScreen = React.lazy(() => import('./screens/PaymentMethodScreen'));
const PlaceOrderScreen = React.lazy(() => import('./screens/PlaceOrderScreen'));
const ProductListScreen = React.lazy(() => import('./screens/ProductListScreen'));
const ProductScreen = React.lazy(() => import('./screens/ProductScreen'));
const ProfileScreen = React.lazy(() => import('./screens/ProfileScreen'));
const RegisterScreen = React.lazy(() => import('./screens/RegisterScreen'));
const ShippingAddressScreen = React.lazy(() => import('./screens/ShippingAddressScreen'));
const SigninScreen = React.lazy(() => import('./screens/SigninScreen'));
const ProductEditScreen = React.lazy(() => import('./screens/ProductEditScreen'));
const OrderListScreen = React.lazy(() => import('./screens/OrderListScreen'));
const UserListScreen = React.lazy(() => import('./screens/UserListScreen'));
const UserEditScreen = React.lazy(() => import('./screens/UserEditScreen'));
const SellerScreen = React.lazy(() => import('./screens/SellerScreen'));
const SearchScreen = React.lazy(() => import('./screens/SearchScreen'));
const MapScreen = React.lazy(() => import('./screens/MapScreen'));
const DashboardScreen = React.lazy(() => import('./screens/DashboardScreen'));
const EssayList = React.lazy(() => import('./screens/essay/EssayList'));
const EssayEdit = React.lazy(() => import('./screens/essay/EssayEdit'));
const EssayListTrash = React.lazy(() => import('./screens/essay/EssayListTrash'));
const EssayCreate = React.lazy(() => import('./screens/essay/EssayCreate'));

function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const userCoinCreate = useSelector((state) => state.userCoinCreate);
  const {
    success: successCoin,
  } = userCoinCreate;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  // const [coins, setCoins] = useState(0);

  useEffect(() => {

    dispatch(listProductCategories());

  }, [dispatch, successCoin]);
  return (


    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
              amazona
            </Link>
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>

            {/* coins */}
            {userInfo ? (
              <div className="dropdown" >
                <Link to="/essayList">
                  Essay
                </Link>
                {/* <Link to="#">
                  Coin: {userInfo.coins ?? 0} đ
                </Link> */}
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <Suspense fallback={<LoadingBox></LoadingBox>}>
          <aside className={sidebarIsOpen ? 'open' : ''}>
            <ul className="categories">
              <li>
                <strong>Categories</strong>
                <button
                  onClick={() => setSidebarIsOpen(false)}
                  className="close-sidebar"
                  type="button"
                >
                  <i className="fa fa-close"></i>
                </button>
              </li>
              {loadingCategories ? (
                <LoadingBox></LoadingBox>
              ) : errorCategories ? (
                <MessageBox variant="danger">{errorCategories}</MessageBox>
              ) : (
                categories.map((c) => (
                  <li key={c}>
                    <Link
                      to={`/search/category/${c}`}
                      onClick={() => setSidebarIsOpen(false)}
                    >
                      {c}
                    </Link>
                  </li>
                ))
              )}

              {/* Reponsi */}
              <div className="reponsi">
                {userInfo && userInfo.isAdmin && (
                  <ul >
                    <li>
                      <strong>Admin</strong>
                    </li>
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/productlist">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Orders</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Users</Link>
                    </li>
                  </ul>
                )}
                {userInfo ? (
                  <ul>
                    <li>
                      <strong>{userInfo.name}</strong>
                    </li>
                    <li>
                      <Link to="/profile">User Profile</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">Order History</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <Link to="/signin">Sign In</Link>
                )}
                {userInfo && userInfo.isSeller && (
                  <ul>
                    <li>
                      <strong>Seller</strong>
                    </li>
                    <li>
                      <Link to="/productlist/seller">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist/seller">Orders</Link>
                    </li>
                  </ul>
                )}
              </div>
            </ul>
          </aside>

          <main>
            <Route path="/seller/:id" component={SellerScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/product/:id" component={ProductScreen} exact></Route>
            <Route path="/product/:id/edit" component={ProductEditScreen} exact ></Route>

            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route path="/orderhistory" component={OrderHistoryScreen}></Route>



            <Route
              path="/search/name/:name?"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/category/:category"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
              component={SearchScreen}
              exact
            ></Route>
            {/* ------------------------- */}
            <PrivateRoute path="/essay/:id/edit" component={EssayEdit} exact></PrivateRoute>
            <PrivateRoute path="/essay/create" component={EssayCreate} exact></PrivateRoute>

            <PrivateRoute
              path="/essayList/pageNumber/:pageNumber"
              component={EssayList}
              exact
            ></PrivateRoute>

            <PrivateRoute
              path="/essayList/category/:category/address/:address/pageNumber/:pageNumber"
              component={EssayList}
              exact
            ></PrivateRoute>
            <PrivateRoute path="/essayList" component={EssayList} exact></PrivateRoute>

            <PrivateRoute
              path="/EssayListTrash/pageNumber/:pageNumber"
              component={EssayListTrash}
              exact
            ></PrivateRoute>
            <PrivateRoute path="/EssayListTrash" component={EssayListTrash} exact></PrivateRoute>

            <PrivateRoute
              path="/profile"
              component={ProfileScreen}
            ></PrivateRoute>
            <PrivateRoute
              path="/map"
              component={MapScreen}
            ></PrivateRoute>



            <AdminRoute
              path="/productlist/pageNumber/:pageNumber"
              component={ProductListScreen}
              exact
            ></AdminRoute>
            <AdminRoute
              path="/productlist"
              component={ProductListScreen}
              exact
            ></AdminRoute>
            <AdminRoute
              path="/orderlist"
              component={OrderListScreen}
              exact
            ></AdminRoute>
            <AdminRoute
              path="/userlist"
              component={UserListScreen}
            ></AdminRoute>
            <AdminRoute
              path="/user/:id/edit"
              component={UserEditScreen}
            ></AdminRoute>
            <AdminRoute
              path="/dashboard"
              component={DashboardScreen}
            ></AdminRoute>

            <SellerRoute
              path="/productlist/seller"
              component={ProductListScreen}
            ></SellerRoute>
            <SellerRoute
              path="/orderlist/seller"
              component={OrderListScreen}
            ></SellerRoute>

            <Route path="/" component={HomeScreen} exact></Route>
            <Route path="/pageNumber/:pageNumber" component={HomeScreen} exact></Route>
          </main>
        </Suspense>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>

  );
}

export default App;