import React, { Suspense, useEffect } from 'react';
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { TOAST_TYPE } from 'renderer/constants/AppConstants';
import { useAuth } from 'renderer/context/AuthContextProvider';
import { CommonUtils } from 'renderer/utils/CommonUtils';

interface Props {
  component: any;
}

const AuthGuard = ({ component }: Props) => {
  const { authed } = useAuth();
  // let authed = false;
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();


  return authed ? (
    <Suspense fallback={<div>Need to Logged in ....</div>}>
      {component}
    </Suspense>
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthGuard;
