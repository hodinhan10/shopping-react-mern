import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  const ReviewUsers = [...product.reviews].filter(r => r.rating >=3);
  const RatingUsers = (ReviewUsers.reduce((a, c) => c.rating + a, 0)/ReviewUsers.length)
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
          rating={( userInfo !== null && userInfo !== undefined && userInfo.isAdmin ) ? product.rating : RatingUsers}
          numReviews={(userInfo !== null && userInfo !== undefined && userInfo.isAdmin) ? product.numReviews : ReviewUsers.length}
        ></Rating>
        <div className="row">
          <div className="price">${product.price}</div>
          <div>
            <Link to={`/seller/${product?.seller?._id}`}>
              {product?.seller?.seller?.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
