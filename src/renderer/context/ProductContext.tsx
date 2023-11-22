// ProductContext.ts

import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { Product } from 'renderer/types/product';

interface ProductContextProps {
  allProducts: Product[];
  setAllProducts: Dispatch<SetStateAction<Product[]>>;
  getProductById: (productId: number) => Product | undefined;
  updateProductById: (
    productId: number,
    updatedProduct: Product,
  ) => Promise<void>;
  createProduct: (newProduct: Product) => Promise<void>;
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined,
);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [allProducts, setAllProducts] = React.useState<Product[]>([]);

  const getProductById = (productId: number): Product | undefined => {
    return allProducts.find((product) => product.id === productId);
  };

  const updateProductById = async (
    productId: number,
    updatedProduct: Product,
  ): Promise<void> => {
    await window.electron.updateProductById(productId, updatedProduct);
  };

  // Your React component or service where you use createProduct

  const createProduct = async (newProduct: Product): Promise<void> => {
    try {
      const fetchNewProduct = await window.electron.insertProduct(newProduct);
      if (fetchNewProduct) {
        // Handle the newly created product, for example, update state
        setAllProducts((prevProducts) => [...prevProducts, fetchNewProduct]);
        console.log('Product created successfully:', fetchNewProduct);
      } else {
        console.log('Error creating product. Fetch result is null.');
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  // Use useEffect to fetch data when there's a product update or creation
  useEffect(() => {
    window.electron.getAllProducts().then((products: Product[]) => {
      setAllProducts(products);
    });
  }, []);

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        setAllProducts,
        getProductById,
        updateProductById,
        createProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextProps => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
