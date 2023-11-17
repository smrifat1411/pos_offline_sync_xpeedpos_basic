import React from 'react';
import ProductItem from './ProductItem';
import { useProductContext } from 'renderer/context/ProductContext';

const ProductList: React.FC = () => {
  const { allProducts } = useProductContext();

  return (
    <div className="grid p-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
      {allProducts.length > 0 &&
        allProducts.map((product: any, i: any) => (
          <ProductItem data={product} key={i} />
        ))}
    </div>
  );
};

export default ProductList;
