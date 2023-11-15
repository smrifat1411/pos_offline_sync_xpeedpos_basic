'use client';
import { Divider } from '@mui/material';
import navData from '../lib/navitem.json';
import SideNavItem from './SideNavItem';

import { useUser } from '../context/UserContextProvider';
import logo from '../assets/images/logo.png';

interface Item {
  id: number;
  name: string;
  link: string;
  svgPath: string;
  type: string;
}

type Props = {};

const SideNav = (props: Props) => {
  const { user } = useUser();

  const verifyUserRoute = (item: Item, index: number, type: string) => {
    if (item.type === type)
      return (
        <SideNavItem
          name={item.name}
          link={item.link}
          svgPath={item.svgPath}
          key={index}
        />
      );
  };

  return (
    <div className="flex flex-col gap-3 p-2 bg-gray-50 min-h-full h-fit sticky left-0 top-0">
      <div id="imageWrapper" className="w-20 mx-auto">
        <img src={logo} alt="Brand Logo" className="h-full w-full rounded" />
      </div>
      <Divider></Divider>
      {navData.map((item: Item, i) => verifyUserRoute(item, i, 'public'))}
      {(user?.role === 'manager' || user?.role === 'admin') &&
        navData.map((item: Item, i) => verifyUserRoute(item, i, 'private'))}
      {user?.role &&
        user.role === 'admin' &&
        navData.map((item: Item, i) => verifyUserRoute(item, i, 'protected'))}
    </div>
  );
};

export default SideNav;
