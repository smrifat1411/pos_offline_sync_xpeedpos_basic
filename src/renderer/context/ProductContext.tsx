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
import { CommonUtils } from 'renderer/utils/CommonUtils';

interface ProductContextProps {
  allProducts: Product[];
  setAllProducts: Dispatch<SetStateAction<Product[]>>;
  getProductById: (productId: number) => Product | undefined;
  updateProductById: (
    productId: number,
    updatedProduct: Product,
  ) => Promise<void>;
  createProduct: (newProduct: Product) => Promise<void>;
  getAllProducts: () => Promise<void>; // Make getAllProducts return a promise
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
  ) => {
    try {
      // Call the API or perform the update operation
      const result = await window.electron.updateProductById(
        productId,
        updatedProduct,
      );

      if (result.success) {
        setAllProducts((prev: Product[]) => {
          // Find the index of the product with the matching ID
          const index = prev.findIndex((product) => product.id === productId);

          // If the product is found, replace it with the updated product
          if (index !== -1) {
            const newProducts = [...prev];
            newProducts[index] = result.data;
            return newProducts;
          }
          return prev;
        });
        CommonUtils().showToast('success', 'Product updated successfully');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      CommonUtils().showToast('error', 'Error updating product');
    }
  };

  const createProduct = async (newProduct: Product): Promise<void> => {
    try {
      const result = await window.electron.insertProduct(newProduct);

      if (result.success) {
        setAllProducts((prevProducts) => [...prevProducts, result.data]);
        CommonUtils().showToast('success', 'Product created successfully');
      } else {
        CommonUtils().showToast(
          'error',
          result.error || 'Error creating product',
        );
      }
    } catch (error) {
      console.error('Error creating product:', error);
      CommonUtils().showToast('error', 'Error creating product');
    }
  };

  const getAllProducts = async () => {
    const { data, success } = await window.electron.getAllProducts();

    success && setAllProducts(data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        setAllProducts,
        getProductById,
        updateProductById,
        createProduct,
        getAllProducts,
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
