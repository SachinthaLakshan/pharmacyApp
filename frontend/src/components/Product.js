import React from 'react';
import Rating from './Rating';
export default function Product(props) {
  const { products } = props;
  return (
    <div key={products._id} className="card">
      <a href={`/products/${products._id}`}>
        <img className="medium" src={products.image} alt={products.name} />
      </a>
      <div className="card-body">
        <a href={`/products/${products._id}`}>
          <h2>{products.name}</h2>
        </a>
        <Rating rating={products.rating} numReviews={products.numReviews} />
        <div className="price">{`Rs. ${products.price}.00`}</div>
      </div>
    </div>
  );
}
