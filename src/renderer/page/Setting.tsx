import { Card, Modal } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'renderer/components/Button';
import RegistrationForm from 'renderer/components/RegistrationForm';
import { useAuth } from 'renderer/context/AuthContextProvider';
import ClosingForm from 'renderer/features/closing/components/ClosingForm';

type Props = {};

const Setting = (props: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [isClosingModalOpen, setIsClosingModalOpen] = useState(false);
  const { userDetails } = useAuth();

  const navigate = useNavigate();
  const openModal = () => {
    navigate('/register');
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const openClosingModal = () => {
    setIsClosingModalOpen(true);
  };

  const closeClosingModal = () => {
    setIsClosingModalOpen(false);
  };

  return (
    <div className="flex w-full justify-center items-center gap-5 h-full">
      {userDetails?.role === 'admin' ? (
        <Button onclick={openModal} txt="Create/Add Manager" />
      ) : (
        <span className="font-extrabold text-2xl text-red">
          Please Contact with your Owner to add another manager
        </span>
      )}

      <Button onclick={openClosingModal}  txt="Close Shop for today" />
      <Modal
        open={isClosingModalOpen}
        onClose={closeClosingModal}
        className="flex justify-center items-center"
      >
        <ClosingForm />
      </Modal>
    </div>
  );
};

export default Setting;
