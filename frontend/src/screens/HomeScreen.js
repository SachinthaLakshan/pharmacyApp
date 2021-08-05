import React, { useEffect } from 'react';
import Product from '../components/Product';

import MessageBox from '../components/MessageBox';
import LodingBox from '../components/LodingBox';
import { listProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <div>
      {loading ? (
        <LodingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((products) => (
            <Product key={products._id} products={products} />
          ))}
        </div>
      )}
    </div>
  );
}
