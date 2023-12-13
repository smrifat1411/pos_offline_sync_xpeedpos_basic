import React from 'react';
import CloseButton from './CloseButton';
import useClickOutside from '../hooks/closeOustside';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, content }) => {
  const wrapperRef = useClickOutside(closeModal);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 border-1 border-solid flex items-center justify-center z-50 bg-slate-200 bg-opacity-50">
      <div className=" fixed inset-0  bg-slate-400 opacity-50"></div>

      <div
        className="bg-amber-50 flex flex-col gap-2 p-4 rounded-xl z-10 shadow-md"
        ref={wrapperRef}
      >
        <div className="relative flex justify-end items-center w-full">
          <CloseButton onClick={closeModal} />
        </div>

        {content}
      </div>
    </div>
  );
};

export default Modal;
