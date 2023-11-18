import { useEffect, useState } from 'react';
import { Product } from '../../../types/product';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Modal,
} from '@mui/material';
import { Edit } from '@mui/icons-material';

import { useSettings } from '../../../context/settingsContextProvider';
import CategoryDropdown from './CategoryDropdown';

interface Option {
  value: string;
  label: string;
}

type Props = {
  product: Product;
};

const EditProduct = ({ product }: Props) => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const { addToTrash } = useSettings();

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
    price: Yup.number().required('Price is required'),
    category: Yup.string().required('Category is required'),
    discountable: Yup.boolean().required(
      'Please define is this product is discountable or not',
    ),
    discount: Yup.number(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      price: product.sellingPrice,
      category: product.category,
      discountable: product.discountable,
      discount: product.discount,
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = {
        ...product,
        price: values.price,
        category: values.category,
        discountable: values.discountable,
        discount: values.discountable ? values.discount : 0,
      };
      // await updateProduct(collections, data);
      formik.resetForm({ values: data });
      setIsOpenEditModal(false);
    },
  });

  const handleDelete = async () => {
    await addToTrash('products', product.name);
    // await deleteProduct(collections, product.name);
    setIsOpenEditModal(false);
  };

  return (
    <>
      <IconButton
        onClick={() => setIsOpenEditModal(true)}
        sx={{ position: 'absolute', top: 0, right: 0 }}
        size="small"
      >
        <Edit fontSize="inherit" />
      </IconButton>
      <Modal
        open={isOpenEditModal}
        onClose={() => {
          setIsOpenEditModal(false);
          formik.resetForm();
        }}
        aria-labelledby="add-inventory-item"
        aria-describedby="add-inventory-item"
      >
        <Box className="rounded border-gray-300 w-11/12 sm:w-3/4 lg:w-2/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl p-4">
          <button
            className="absolute top-0 right-0 p-2 bg-gray-300 rounded"
            onClick={() => {
              setIsOpenEditModal(false);
              formik.resetForm();
            }}
          >
            X
          </button>
          <form
            className="h-full flex flex-col items-center relative px-4 pb-6 rounded-lg"
            onSubmit={formik.handleSubmit}
          >
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="text"
                name="name"
                id="name"
                className={`peer block w-full appearance-none border-0 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500`}
                value={product.name}
                disabled
                readOnly
              />
              <label
                htmlFor="name"
                className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500`}
              >
                Product Name
              </label>
            </div>

            <div className="grid md:grid-cols-2 w-full md:gap-6">
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="number"
                  name="price"
                  id="price"
                  className={`peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500 ${
                    formik.errors.price && 'border-red-500'
                  }`}
                  placeholder=" "
                  onChange={formik.handleChange}
                  value={formik.values.price}
                />
                <label
                  htmlFor="price"
                  className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 ${
                    formik.values.price && 'text-blue-600'
                  }`}
                >
                  Price
                </label>
                {formik.errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.price}
                  </p>
                )}
              </div>
              <div className="mb-6 w-full">
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
            <div className="flex w-full flex-wrap">
              <div className="group relative z-0 mb-6 grow">
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => handleDiscountableCheckbox(e)}
                      checked={formik.values.discountable==0?false:true}
                    />
                  }
                  label="is Discountable Product"
                />
                {formik.errors.discountable && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.discountable}
                  </p>
                )}
              </div>
              {formik.values.discountable && (
                <div className="group relative z-0 mb-6 grow">
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
              )}
            </div>
            <div className="w-full flex flex-wrap justify-evenly">
              <Button
                onClick={handleDelete}
                variant="contained"
                color="warning"
              >
                Delete
              </Button>
              <Button type="submit" variant="outlined" color="success">
                Update
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default EditProduct;
