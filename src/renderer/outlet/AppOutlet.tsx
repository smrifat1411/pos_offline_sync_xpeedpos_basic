import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from 'renderer/components/LoginForm';
import RegistrationForm from 'renderer/components/RegistrationForm';
import ProductList from 'renderer/features/products/components/ProductList';
import AuthGuard from 'renderer/guards/AuthGuards';
import Expense from 'renderer/page/Expense';
import Home from 'renderer/page/Home';
import Inventory from 'renderer/page/Inventory';
import Orders from 'renderer/page/Orders';
import Report from 'renderer/page/Report';
import Setting from 'renderer/page/Setting';
type Props = {};

const AppOutlet = (props: Props) => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<AuthGuard component={<Home />} />} />
        <Route path="orders" element={<AuthGuard component={<Orders />} />} />
        <Route path="report" element={<AuthGuard component={<Report />} />} />
        <Route path="expense" element={<AuthGuard component={<Expense />} />} />
        <Route path="settings" element={<AuthGuard component={<Setting />} />} />
        <Route
          path="inventory"
          element={<AuthGuard component={<Inventory />} />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Route>
    </Routes>
  );
};

export default AppOutlet;
