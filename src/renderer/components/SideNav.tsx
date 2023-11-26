import { Divider } from '@mui/material';
import navData from '../lib/navitem.json';
import SideNavItem from './SideNavItem';

import logo from '../assets/images/logo.png';
// Import SVG paths dynamically
import homeSvgPath from '../assets/icon/home.svg';
import ordersSvgPath from '../assets/icon/orders.svg';
import inventorySvgPath from '../assets/icon/inventory.svg';
import salarySvgPath from '../assets/icon/salary.svg';
import reportSvgPath from '../assets/icon/report.svg';
import expenseSvgPath from '../assets/icon/users.svg';
import settingSvgPath from '../assets/icon/setting.svg';
import { useAuth } from 'renderer/context/AuthContextProvider';

interface Item {
  id: number;
  name: string;
  link: string;
  type: string;
}

type Props = {};

const svgPaths: { [key: string]: string } = {
  home: homeSvgPath,
  orders: ordersSvgPath,
  inventory: inventorySvgPath,
  employeesalary: salarySvgPath,
  report: reportSvgPath,
  expense: expenseSvgPath,
  settings: settingSvgPath,
};

const SideNav = (props: Props) => {
  const { userDetails } = useAuth();

  const verifyUserRoute = (item: Item, index: number, type: string) => {
    const svgPath = svgPaths[item.name.toLowerCase().replace(/\s/g, '')];
    if (item.type === type)
      return (
        <SideNavItem
          name={item.name}
          link={item.link}
          svgPath={svgPath}
          key={index}
        />
      );
  };

  return (
    <div className="flex flex-col gap-3 p-2 bg-gray-50 min-h-full h-fit sticky left-0 top-0">
      <div id="imageWrapper" className="w-36 mx-auto">
        <img src={logo} alt="Brand Logo" className=" rounded" />
      </div>
      <Divider></Divider>
      {navData.map((item: Item, i) => verifyUserRoute(item, i, 'public'))}
      {(userDetails?.role === 'manager' || userDetails?.role === '') &&
        navData.map((item: Item, i) => verifyUserRoute(item, i, 'private'))}
      {userDetails?.role === 'manager' &&
        navData.map((item: Item, i) => verifyUserRoute(item, i, 'protected'))}
    </div>
  );
};

export default SideNav;
