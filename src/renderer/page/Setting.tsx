import { Card, Modal } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'renderer/components/Button';
import RegistrationForm from 'renderer/components/RegistrationForm';
import { useAuth } from 'renderer/context/AuthContextProvider';

type Props = {};

const Setting = (props: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { userDetails } = useAuth();

  const navigate = useNavigate();
  const openModal = () => {
    navigate('/register');
  };
  const closeModal = () => {
    setModalOpen(false);
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

      <Button onclick={() => ''} txt="Close Shop for today" />
    </div>
  );
};

export default Setting;
