import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from 'renderer/page/Home';
import Orders from 'renderer/page/Orders';
import Report from 'renderer/page/Report';
type Props = {};

const AppOutlet = (props: Props) => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="orders" element={<Orders />} />
        <Route path="report" element={<Report />} />
      </Route>
    </Routes>
  );
};

export default AppOutlet;
