import React from "react";
import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { useUserContext } from "./context/UserContext";
import { NavigationMenu } from "./components/NavigationMenu";
import { Box } from "@mui/material";
import { OrarSaptamana } from "./pages/OrarSaptamana";
import { FormularCreereCurs } from "./components/FormularCreereCurs";
import { theme } from "./utils/material-ui-theme";
import { PanouAdmin } from "./pages/PanouAdmin";

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
};

function App() {
	const userData = useUserContext();

	return (
		<Routes>
			<Route element={<LoginPage />} path="/" />
			<Route element={<PageLayout/>}>
				<Route element={userData?.state.loggedIn ? <HomePage /> : <Navigate replace={true} to="/"/>} path="home"/>
				<Route element={userData?.state.loggedIn ? <OrarSaptamana /> : <Navigate replace={true} to="/"/>} path="orar_saptamana"/>
				<Route element={userData?.state.loggedIn ? <FormularCreereCurs /> : <Navigate replace={true} to="/"/>} path="creere_curs"/>
				<Route element={userData?.state.loggedIn ? <PanouAdmin /> : <Navigate replace={true} to="/"/>} path="admin"/>
			</Route>
		</Routes>
	);
}

export default App;
