import { Login, Logout } from '@mui/icons-material';
import { Button } from '@mui/material';
import path from 'path';
import React from 'react';
import { Router, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from 'renderer/context/AuthContextProvider';
import { UserContext } from 'renderer/context/UserContextProvider';

type Props = {};

const TopBar = (props: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { authed, logout } = useAuth();
  return (
    <div className="w-full flex gap-3 justify-end items-center pt-2 px-5 pb-5">
      {/* <div className="pl-4 w-3/5 flex justify-between">
        <h1 className="text-3xl font-thin">POS Software - 3pm Restourant</h1>
        <div className="w-[80%]">
          <SearchBox />
        </div>
      </div> */}
      {/* <div className="flex gap-3 justify-end items-center pr-4"> */}

      {authed && (
        <Button
          variant="outlined"
          startIcon={<Logout />}
          onClick={() => logout()}
          color="warning"
        >
          Log Out
        </Button>
      )}
      {authed === false && (
        <Button
          variant="contained"
          startIcon={<Login />}
          onClick={() => pathname === '/login' ? navigate('/register') :navigate('/login')}
          color="info"
        >
          {pathname === '/login' ? 'Sign Up' : 'Log In'}
        </Button>
      )}
      {/* </div> */}
    </div>
  );
};

export default TopBar;
