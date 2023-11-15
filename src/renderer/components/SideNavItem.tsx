
import { Divider } from "@mui/material";


import React from "react";
import { Link } from "react-router-dom";

type Props = { name: string; link: string; svgPath: string };

const SideNavItem = ({ name, link, svgPath }: Props) => {


  return (
    <>
      <Link

        to={link}
        className={`grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 justify-items-center items-center text-center relative gap-0.5 text-gray-600 p-2 rounded hover:bg-gray-800 hover:text-white ${
          "ab" === link ? "bg-gray-800 text-white" : ""
        } transition-colors ease-out duration-500`}
      >
        <div className="md:col-span-1">
          <img
            // width={40}
            // height={40}
            src={svgPath}
            alt={name}
            // sizes="100vw"
            // className="w-full h-auto"
          ></img>
        </div>
        <p className="md:col-span-3 lg:col-span-4 self-center">{name}</p>
      </Link>
      <Divider></Divider>
    </>
  );
};

export default SideNavItem;
