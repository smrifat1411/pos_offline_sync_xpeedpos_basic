import React, { useState } from 'react';
import ProductCreateForm from './ProductCreateForm';

import Button from 'renderer/components/Button';
import Modal from 'renderer/components/Modal';


type Props = {};

const ProductHead = (props: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
const user:any  = {
  role:"admin"
}

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleProductCreated = () => {
    closeModal();
  };

  return (
    <div className="flex w-full justify-evenly px-2 items-center">
      <h1 className="text-xl font-medium">Product Menu</h1>
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
