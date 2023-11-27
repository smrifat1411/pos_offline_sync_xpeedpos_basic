import { Route, Routes } from 'react-router-dom';
import './styles/App.global.css';
import 'tailwindcss/tailwind.css';

import AppOutlet from './outlet/AppOutlet';
import SideNav from './components/SideNav';

import { CartProvider } from './context/CartContext';

import OrderContextProvider from './context/OrderContextProvider';
import { ProductProvider } from './context/ProductContext';
import AuthContextProvider from './context/AuthContextProvider';
import TopBar from './components/TopBar';
import { ExpenseProvider } from './context/ExpenseContext';
import ToastComponent from './components/ToastComponent';

type Props = {};

const App = (props: Props) => {
  return (
    <div className="w-full flex">
      <AuthContextProvider>
        <ProductProvider>
          <CartProvider>
            <OrderContextProvider>
              <ExpenseProvider>
                <ToastComponent />
                <SideNav />
                <div className="w-full">
                  <TopBar />
                  <AppOutlet />
                </div>
              </ExpenseProvider>
            </OrderContextProvider>
          </CartProvider>
        </ProductProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;
