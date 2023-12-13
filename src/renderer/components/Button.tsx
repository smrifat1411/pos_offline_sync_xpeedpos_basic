import React from 'react';

type Props = {
  txt: string;
  onclick: any;
};

const Button = ({ txt, onclick }: Props) => {
  return (
    <button
      type="submit"
      className="bg-cyan-600 hover:bg-gray-700 text-white font-semibold py-1 px-2 border text-sm border-gray-700 rounded shadow-sm shadow-slate-500"
      onClick={onclick && onclick}
    >
      {txt}
    </button>
  );
};

export default Button;
