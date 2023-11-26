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
  // Modal,
} from '@mui/material';
import { Edit } from '@mui/icons-material';

import { useSettings } from '../../../context/settingsContextProvider';
import CategoryDropdown from './CategoryDropdown';
import Modal from 'renderer/components/Modal';
import ProductCreateForm from './ProductCreateForm';

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
        isOpen={isOpenEditModal}
        closeModal={() => {
          setIsOpenEditModal(false);
          formik.resetForm();
        }}
        aria-labelledby="add-inventory-item"
        aria-describedby="add-inventory-item"
        content={<ProductCreateForm onSuccess={() => {
          setIsOpenEditModal(false);
          formik.resetForm();
        }} product={product} />}
      />
    </>
  );
};

export default EditProduct;
