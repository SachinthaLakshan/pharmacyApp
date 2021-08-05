import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';
export default function Product(props) {
  const { products } = props;
  return (
    <div key={products._id} className="card">
      <Link to={`/products/${products._id}`}>
        <img className="medium" src={products.image} alt={products.name} />
      </Link>
      <div className="card-body">
        <Link to={`/products/${products._id}`}>
          <h2>{products.name}</h2>
        </Link>
        <Rating rating={products.rating} numReviews={products.numReviews} />
        <div className="price">{`Rs. ${products.price}.00`}</div>
      </div>
    </div>
  );
}
