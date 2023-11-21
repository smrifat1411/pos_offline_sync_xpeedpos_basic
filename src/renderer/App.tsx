import { Route, Routes } from 'react-router-dom';
import './styles/App.global.css';
import 'tailwindcss/tailwind.css';

import AppOutlet from './outlet/AppOutlet';
import SideNav from './components/SideNav';

import { CartProvider } from './context/CartContext';
import { UserContextProvider } from './context/UserContextProvider';
import OrderContextProvider from './context/OrderContextProvider';
import { ProductProvider } from './context/ProductContext';
import AuthContextProvider from './context/AuthContextProvider';
import TopBar from './components/TopBar';

type Props = {};

const App = (props: Props) => {
  return (
    <div className="w-full flex">
      <AuthContextProvider>
        <UserContextProvider>
          <ProductProvider>
            <CartProvider>
              <OrderContextProvider>
                <SideNav />
                <div className="w-full">
                  <TopBar/>
                  <AppOutlet />
                </div>
              </OrderContextProvider>
            </CartProvider>
          </ProductProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;
