import { Route, Routes } from 'react-router-dom';
import './styles/App.global.css';
import 'tailwindcss/tailwind.css';

import AppOutlet from './outlet/AppOutlet';
import SideNav from './components/SideNav';

import { CartProvider } from './context/CartContext';
import { UserContextProvider } from './context/UserContextProvider';

type Props = {};

const App = (props: Props) => {
  return (
    <div className="w-full flex">
      <UserContextProvider>
      <CartProvider>
        <SideNav />
        <AppOutlet />
      </CartProvider>

      </UserContextProvider>
    </div>
  );
};

export default App;
