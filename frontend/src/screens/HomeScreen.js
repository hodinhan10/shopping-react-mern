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
  }, [dispatch]);

  // console.log('1',navigator.geolocation.getCurrentPosition(a))
  const [details, setDetails] = useState(null);

    const getUserGeolocationDetails = () => {
        fetch(
            "https://geolocation-db.com/json/d802faa0-10bd-11ec-b2fe-47a0872c6708"
        )
            .then(response => response.json())
            .then(data => setDetails(data));
    };
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={getUserGeolocationDetails}
      >
        Find my details
      </button>

      <div className="row justify-content-center mt-3">
        <div className="col-lg-6 text-center text-dark">
          {details && (
            <ul className="list-group">
              <li className="list-group-item">
                Location :{" "}
                {`${details.city}, ${details.country_name}(${details.country_code})`}
              </li>
              <li className="list-group-item">
                IP: {details.IPv4}
              </li>
            </ul>
          )}
        </div>
      </div>

      <h2>Top Sellers</h2>
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
      <h2>Featured Products</h2>
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
    </div>
  );
}