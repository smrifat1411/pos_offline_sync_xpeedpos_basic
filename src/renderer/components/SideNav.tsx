import { Divider } from '@mui/material';
import { useAuth } from 'renderer/context/AuthContextProvider';
import navData from '../lib/navitem.json';
import SideNavItem from './SideNavItem';

// Import SVG paths dynamically
import homeSvgPath from '../assets/icon/home.svg';
import ordersSvgPath from '../assets/icon/orders.svg';
import inventorySvgPath from '../assets/icon/inventory.svg';
import salarySvgPath from '../assets/icon/salary.svg';
import reportSvgPath from '../assets/icon/report.svg';
import expenseSvgPath from '../assets/icon/users.svg';
import settingSvgPath from '../assets/icon/setting.svg';

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
  setting: settingSvgPath,
};

function SideNav(props: Props) {
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
      {/* A wordmark rather than an image. The logo file that shipped here was
          another company's mark, left over from an earlier build of this app. */}
      <div className="mx-auto px-3 py-2 text-center">
        <span className="text-xl font-bold tracking-tight text-slate-900">
          Xpeed<span className="text-emerald-600">POS</span>
        </span>
      </div>
      <Divider />
      {navData.map((item: Item, i) => verifyUserRoute(item, i, 'public'))}
      {(userDetails?.role === 'manager' || userDetails?.role === 'admin') &&
        navData.map((item: Item, i) => verifyUserRoute(item, i, 'private'))}
      {userDetails?.role === 'admin' &&
        navData.map((item: Item, i) => verifyUserRoute(item, i, 'protected'))}
    </div>
  );
}

export default SideNav;
