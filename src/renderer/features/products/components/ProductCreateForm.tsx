import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import CategoryDropdown from './CategoryDropdown';

import { Checkbox, FormControlLabel } from '@mui/material';
import Button from 'renderer/components/Button';
import { useProductContext } from 'renderer/context/ProductContext';
import { Product } from 'renderer/types/product';
import { useAuth } from 'renderer/context/AuthContextProvider';

interface Option {
  value: string;
  label: string;
}

interface Props {
  onSuccess?: () => void;
  product?: Product;
}

const ProductCreateForm = ({ onSuccess, product }: Props) => {
  const { createProduct, updateProductById } = useProductContext();
  const { userDetails } = useAuth();

  const handleCategoryChange = (option: Option | null) => {
    formik.setFieldValue('category', option ? option.value : '');
  };

  const handleDiscountableCheckbox = (e: any) => {
    formik.setFieldValue('discountable', e.target.checked);
    if (!e.target.checked) {
      formik.setFieldValue('discount', 0);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product Name is required'),
    sellingPrice: Yup.number().required('Price is required'),
    buyingPrice: Yup.number().required('Buying Price is required'),
    category: Yup.string().test(
      'isCategorySelected',
      'Category is required',
      function (value) {
        if (!value || value === 'createNew') {
          return false;
        }
        return true;
      },
    ),
    discountable: Yup.boolean().required(
      'Please define if this product is discountable or not',
    ),
    company: Yup.string(),

    discount: Yup.number(),
    stockAmount: Yup.number().required('Please add at least one stock'),
  });

  const formik = useFormik({
    initialValues: {
      name: product?.name || '',
      sellingPrice: product?.sellingPrice || '',
      buyingPrice: product?.buyingPrice || '', // Added buyingPrice field
      category: product?.category || '',
      discountable: product?.discountable || 0,
      discount: product?.discount || 0,
      stockAmount: product?.stockAmount || 0,
      company: product?.company || '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data: Product = {
        name: values.name,
        sellingPrice: Number(values.sellingPrice),
        buyingPrice: Number(values.buyingPrice),
        discountable: Number(values.discount) > 0 ? 1 : 0,
        category: values.category,
        discount: values.discount,
        stockAmount: values.stockAmount,
        company: values.company,
        price: undefined,
      };

      try {
        if (!product) {
          await createProduct(data);
          formik.resetForm();
        } else if (product.id) {
          await updateProductById(product?.id, data);
        }

        onSuccess && onSuccess();
      } catch (error) {}
    },
  });

  return (
    <form
      className="h-full w-[480px] flex flex-col items-center relative px-4 pb-6 rounded-lg"
      onSubmit={formik.handleSubmit}
    >
      <div className="group relative z-0 mb-6 w-full">
        <input
          type="text"
          name="name"
          id="name"
          className={`peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500 ${
            formik.errors.name && 'border-red-500'
          }`}
          placeholder=""
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <label
          htmlFor="name"
          className={`absolute top-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-lg text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-900 peer-focus:dark:text-blue-500 ${
            formik.values.name && 'text-blue-600'
          }`}
        >
          Product Name
        </label>
        {formik.errors.name && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
        )}
      </div>

      <div className="w-full flex items-center gap-2">
        <div className="mb-6 w-full">
          <label htmlFor="buyingPrice" className="text-sm text-gray-900">
            Buying Price
          </label>
          <input
            type="number"
            name="buyingPrice"
            id="buyingPrice"
            className={`peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500 ${
              formik.errors.buyingPrice && 'border-red-500'
            }`}
            placeholder="product buying price"
            onChange={formik.handleChange}
            value={formik.values.buyingPrice}
          />
          {formik.errors.buyingPrice && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.buyingPrice}
            </p>
          )}
        </div>

        {/* Category */}

        <div className="w-full">
          <CategoryDropdown
            selectedCategory={formik.values.category}
            onCategoryChange={handleCategoryChange}
          />
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.category}
            </p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 w-full md:gap-6">
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="number"
            name="sellingPrice"
            id="sellingPrice"
            className={`peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500 ${
              formik.errors.sellingPrice && 'border-red-500'
            }`}
            placeholder=" "
            onChange={formik.handleChange}
            value={formik.values.sellingPrice}
          />
          <label
            htmlFor="sellingPrice"
            className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-md text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 ${
              formik.values.sellingPrice && 'text-blue-600'
            }`}
          >
            Selling Price
          </label>
          {formik.errors.sellingPrice && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.sellingPrice}
            </p>
          )}
        </div>
        {/* Company */}
        <div className="mb-6 w-full">
          <label htmlFor="company" className="text-md text-gray-900">
            Company
          </label>
          <input
            type="text"
            name="company"
            id="company"
            className={`peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500`}
            placeholder=" "
            onChange={formik.handleChange}
            value={formik.values.company}
          />
        </div>
      </div>

      {/*  */}
      <div className="grid md:grid-cols-2 w-full md:gap-6">
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="number"
            name="stockAmount"
            id="stockAmount"
            className={`peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500 ${
              formik.errors.stockAmount && 'border-red-500'
            }`}
            placeholder=" "
            onChange={formik.handleChange}
            value={formik.values.stockAmount}
          />
          <label
            htmlFor="stockAmount"
            className={`absolute top-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-lg text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-900 peer-focus:dark:text-blue-500 ${
              formik.values.stockAmount && 'text-blue-600'
            }`}
          >
            Stock Amount
          </label>
          {formik.errors.sellingPrice && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.stockAmount}
            </p>
          )}
        </div>

        {/* discount */}
        <div className="group relative z-0 mb-6 w-full">
          <FormControlLabel
            required
            control={<Checkbox checked={formik.values.discountable != 0} />}
            label="Discountable Product"
            onChange={(e) => handleDiscountableCheckbox(e)}
            value={true}
          />
          {formik.errors.discountable && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.discountable}
            </p>
          )}
        </div>
      </div>

      {/* Discount */}

      {formik.values.discountable ? (
        <div className="group relative z-0 mb-6 w-[50%] mx-auto">
          <input
            type="number"
            name="discount"
            id="discount"
            className={`peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500 ${
              formik.errors.discount && 'border-red-500'
            }`}
            onChange={formik.handleChange}
            value={formik.values.discount}
          />
          <label
            htmlFor="discount"
            className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 ${
              formik.values.discount && 'text-blue-600'
            }`}
          >
            Percentage of Discount
          </label>
        </div>
      ) : null}
      <Button
        onclick={formik.handleSubmit}
        txt={`${product ? 'Update' : 'Create'}`}
      />
    </form>
  );
};

export default ProductCreateForm;
