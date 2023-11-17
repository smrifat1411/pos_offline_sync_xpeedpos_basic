// ProductContext.ts

import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

export interface Product {
  id?: number;
  name: string;
  category: string;
  price: number;
  discountable?: boolean;
  discount?: number;
}

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
    // await window.electron.
  };

  const createProduct = async (newProduct: Product): Promise<void> => {
    await window.electron.insertProduct(newProduct);
  };

  // Use useEffect to fetch data when there's a product update or creation
  useEffect(() => {
    window.electron.getAllProducts().then((products: Product[]) => {
      setAllProducts(products);
    });
  }, [updateProductById, createProduct]);

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
