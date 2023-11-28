import React, { useState } from 'react';
import ProductCreateForm from './ProductCreateForm';
import Button from 'renderer/components/Button';
import Modal from 'renderer/components/Modal';
import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';
import { debounce } from '@mui/material';
import { useProductContext } from 'renderer/context/ProductContext';

type Props = {};

const ProductHead = (props: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const { setAllProducts } = useProductContext();
  const user: any = {
    role: 'admin',
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleProductCreated = () => {
    closeModal();
    // Optionally, you can refresh the search results or perform any other actions
    fetchSearchResults(searchValue);
  };

  const onSearchChange: SearchProps['onChange'] = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    fetchSearchResults(value);
  };

  const fetchSearchResults = async (value: string) => {
    try {
      const response = await window.electron.searchProductByname(value);
      response.success && setAllProducts(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  console.log(searchResults);

  const { Search } = Input;

  const debounceSearch = debounce(onSearchChange, 500);

  return (
    <div className="flex w-full justify-evenly px-2 items-center">
      <h1 className="text-xl font-medium">Product Menu</h1>
      <Search
        placeholder="input search text"
        allowClear
        onChange={debounceSearch}
        style={{ width: 304 }}
      />
      {(user?.role === '' || user?.role === 'admin') && (
        <Button onclick={openModal} txt="Create Product" />
      )}
      <Modal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        content={<ProductCreateForm onSuccess={handleProductCreated} />}
      />
    </div>
  );
};

export default ProductHead;
