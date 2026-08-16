import React from 'react';
import ProductList from './ProductList';
import ProductHead from './ProductHead';

type Props = {};

function ProductSec(props: Props) {
  return (
    <div className="w-full h-full relative">
      <ProductHead />
      <ProductList />
    </div>
  );
}

export default ProductSec;
