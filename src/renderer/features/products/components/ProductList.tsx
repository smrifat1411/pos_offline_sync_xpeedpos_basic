import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any>([]);

  const handleCollectionChange = async () => {
    const datafetched = await window.electron.getAllProducts();
    setProducts(datafetched);
  };

  useEffect(() => {
    handleCollectionChange();
  }, []);




  return (
    <div className="grid p-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
      {products.length > 0 &&
        products.map((product: any, i: any) => (
          <ProductItem data={product} key={i} />
        ))}
    </div>
  );
};

export default ProductList;
