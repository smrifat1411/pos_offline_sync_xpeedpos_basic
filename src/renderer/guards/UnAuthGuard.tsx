import React, { Suspense } from "react";
import Loader from "../components/Common/Loader";

const UnAuthGuard = ({ component }: any) => {
  return <Suspense fallback={<Loader loading={true} />}>{component}</Suspense>;
};

export default UnAuthGuard;
