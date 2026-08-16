import './styles/App.global.css';
import 'tailwindcss/tailwind.css';

import AppOutlet from './outlet/AppOutlet';
import SideNav from './components/SideNav';

import { CartProvider } from './context/CartContext';

import OrderContextProvider from './context/OrderContextProvider';
import { ProductProvider } from './context/ProductContext';
import AuthContextProvider, { useAuth } from './context/AuthContextProvider';
import TopBar from './components/TopBar';
import { ExpenseProvider } from './context/ExpenseContext';
import ToastComponent from './components/ToastComponent';

/**
 * The navigation chrome, shown only once someone is signed in.
 *
 * The sidebar and top bar used to render unconditionally, so the sign-in screen
 * appeared with a nav rail beside it listing a page the visitor could not open
 * and a "Log In" button pointing at the screen already open. Signed out, the
 * only thing on screen should be the thing to do.
 */
function Shell() {
  const { authed } = useAuth();

  if (!authed) {
    return <AppOutlet />;
  }

  return (
    <div className="flex w-full">
      <SideNav />
      <div className="w-full">
        <TopBar />
        <AppOutlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthContextProvider>
      <ProductProvider>
        <CartProvider>
          <OrderContextProvider>
            <ExpenseProvider>
              <ToastComponent />
              <Shell />
            </ExpenseProvider>
          </OrderContextProvider>
        </CartProvider>
      </ProductProvider>
    </AuthContextProvider>
  );
}

export default App;
