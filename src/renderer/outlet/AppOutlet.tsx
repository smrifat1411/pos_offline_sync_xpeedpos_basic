import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import Home from 'renderer/page/home';
type Props = {}

const AppOutlet = (props: Props) => {
  return (
    <Routes>
    <Route path="/">
      <Route index element={<Home />} />
    </Route>
  </Routes>
  )
}

export default AppOutlet
