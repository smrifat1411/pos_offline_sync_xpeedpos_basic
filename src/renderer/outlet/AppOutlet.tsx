import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from 'renderer/page/Home';
import Orders from 'renderer/page/Orders';
type Props = {};

const AppOutlet = (props: Props) => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  );
};

export default AppOutlet;
