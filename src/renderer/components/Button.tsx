import React from 'react';

type Props = {
  txt: string;
  onclick: any;
};

const Button = ({ txt, onclick }: Props) => {
  return (
    <button
      type="submit"
      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-1 px-2 border text-sm border-gray-700 rounded"
      onClick={onclick && onclick}
    >
      {txt}
    </button>
  );
};

export default Button;
