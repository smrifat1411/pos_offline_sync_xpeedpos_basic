import React from 'react';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'renderer/context/AuthContextProvider';
import { Login, Logout } from '@mui/icons-material';

type Props = {};

const TopBar = (props: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleRefresh = () => {
    // Reload the window
    // navigate(pathname, { replace: true });
    window.location.reload();
  };

  const { authed, logout } = useAuth();

  return (
    <div className="w-full flex gap-3 justify-end items-center pt-2 px-5 pb-5">
      {authed && (
        <>
          <Button variant="contained" onClick={handleRefresh} color="primary">
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<Logout />}
            onClick={() => logout()}
            color="primary"
          >
            Log Out
          </Button>
        </>
      )}
      {!authed && (
        <Button
          variant="contained"
          startIcon={<Login />}
          onClick={() => navigate('/login')}
          color="info"
        >
          Log In
        </Button>
      )}
    </div>
  );
};

export default TopBar;
