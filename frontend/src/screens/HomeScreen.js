import React from 'react';
import data from '../data';
import Product from '../components/Product';

export default function HomeScreen() {
  return (
    <div>
      <div className="row center">
        {data.products.map((products) => (
          <Product key={products._id} products={products} />
        ))}
      </div>
    </div>
  );
}
