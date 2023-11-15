import React, { useState } from 'react';
import ProductItem from './ProductItem';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  const handleCollectionChange = async (data: any) => {
    setProducts(data);
  };

  return (
    <div className="grid p-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
      {products.length > 0 &&
        products.map((product: any, i) => (
          <ProductItem data={{ ...product._data, id: i }} key={i} />
        ))}
    </div>
  );
};

export default ProductList;
