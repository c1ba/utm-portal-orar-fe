import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {useQuery} from "@apollo/client"
import { GET_CURSURI } from './utils/apollo/queries';
import { CursType } from './utils/types/backend-data';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { useUserContext } from './context/UserContext';
import { NavigationMenu } from './components/NavigationMenu';
import { Box } from '@mui/material';
import { OrarSaptamana } from './pages/OrarSaptamana';
import { FormularCreereCurs } from './pages/FormularCreereCurs';
import { theme } from './utils/material-ui-theme';

const PageLayout = () => {
  return (
    <Box sx={{display: "flex"}}>
      <Box component="nav" sx={{width: "358px"}}>
        <NavigationMenu />
      </Box>
      <Box component="main" sx={{flexGrow: 1, position: "relative", height: "100vh", backgroundColor: `${theme.palette.background.default}`}}>
        <Outlet />
      </Box>
    </Box>
  );
}

function App() {
  const userData = useUserContext();

  return (
    <Routes>
      <Route element={<LoginPage />} path="/" />
      <Route element={<PageLayout/>}>
        <Route element={userData?.state.loggedIn ? <HomePage /> : <Navigate replace={true} to="/"/>} path="home"/>
        <Route element={userData?.state.loggedIn ? <OrarSaptamana /> : <Navigate replace={true} to="/"/>} path="orar_saptamana"/>
        <Route element={userData?.state.loggedIn ? <FormularCreereCurs /> : <Navigate replace={true} to="/"/>} path="creere_curs"/>
      </Route>
    </Routes>
  );
}

export default App;
