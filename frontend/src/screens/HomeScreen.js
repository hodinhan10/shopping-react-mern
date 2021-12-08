import React, {
  useEffect, useState
} from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  Carousel
} from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  listProducts
} from '../actions/productActions';
import {
  listTopSellers
} from '../actions/userActions';
import {
  Link
} from 'react-router-dom';
import Essay from '../components/Essay';
import { listEssays } from '../actions/essayActions';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {
    loading,
    error,
    products
  } = productList;

  const userTopSeller = useSelector((state) => state.userTopSeller);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSeller;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
    dispatch(listEssays({}));
  }, [dispatch]);



  const essayList = useSelector((state) => state.essayList);
  const {
    loading: loadingEssays,
    error: errorEssays,
    essayRead: essays,
  } = essayList;

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (id) => (event, isExpanded) => {
    setExpanded(isExpanded ? id : false);
  };
  return (
    <div>
      <h2 className="center_title">Top Sellers</h2>
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )}

      <h2 className="center_title">Featured Products</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
      <div className="accordion">

        <h2 className="center_title">essay</h2>
        {loadingEssays ? (
          <LoadingBox></LoadingBox>
        ) : errorEssays ? (
          <MessageBox variant="danger">{errorEssays}</MessageBox>
        ) : (
          <>
            {essays.length === 0 && <MessageBox>No essay Found</MessageBox>}
            {essays.map((essay) => (
              <div key={essay._id}>
                <Essay essay={essay} handleChange={handleChange} expanded={expanded}></Essay>
              </div>
            ))}
          </>
        )}
      </div>

    </div>
  );
}