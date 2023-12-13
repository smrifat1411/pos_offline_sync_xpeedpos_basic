import React from 'react';

type Props = {
  onClick: () => void;
};

const CloseButton = ({ onClick }: Props) => {
  return (
    <button
      type="button"
      className="bg-red-500 bg-opacity-90 rounded-md p-2 inline-flex items-center justify-center text-gray-900 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all ease-in-out duration-200 shadow-md shadow-slate-500 hover:shadow"
      onClick={onClick}
    >
      <span className="sr-only">Close menu</span>

      <svg
        className="h-6 w-6"
        xmlns="https://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default CloseButton;
