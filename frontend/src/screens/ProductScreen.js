import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LodingBox from '../components/LodingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { datailsProduct } from '../actions/productActions';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const procuctId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(datailsProduct(procuctId));
  }, [dispatch, procuctId]);
  return (
    <div>
      {loading ? (
        <LodingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to Results</Link>
          <div className="row top">
            <div className="col-2">
              <img className="large" src={product.image} alt={product.name} />
            </div>
            <div className="col-1"></div>
            <ul>
              <li>
                <h1>{product.name}</h1>
              </li>
              <li>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </li>
              <li>{`Rs. ${product.price}.00`}</li>
              <li>
                Description:
                <p>{product.description}</p>
              </li>
            </ul>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">{`Rs. ${product.price}.00`}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Out of Stock</span>
                        )}
                      </div>
                    </div>
                  </li>
                  <li>
                    <button
                      disabled={product.countInStock > 0 ? false : true}
                      className="primary block"
                    >
                      Add to Cart
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
