import React, { useState } from "react";
import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { useUserContext } from "./context/UserContext";
import { NavigationMenu } from "./components/NavigationMenu";
import { Box, useMediaQuery } from "@mui/material";
import { OrarSaptamana } from "./pages/OrarSaptamana";
import { theme } from "./utils/material-ui-theme";
import { PanouAdmin } from "./pages/PanouAdmin";
import { DetaliiCurs } from "./pages/DetaliiCurs";
import { Menu } from "@mui/icons-material";
import { CreereCurs } from "./pages/CreereCurs";
import { StergereCurs } from "./pages/StergereCurs";

const PageLayout = () => {
	const isMobile = useMediaQuery("(max-width:600px)");
	const [mobileNavBarOpen, setMobileNavBarOpen] = useState<boolean>(false);
	return (
		<Box sx={{display: "flex"}}>
			{!isMobile ? <Box component="nav" sx={{width: isMobile ? "auto" : "358px"}}>
				<NavigationMenu isMobile={false} />
			</Box> : <NavigationMenu isMobile={true} isOpen={mobileNavBarOpen} setIsOpen={setMobileNavBarOpen} />}
			<Box component="main" sx={{flexGrow: 1, position: isMobile ? "auto" : "relative", height: "100vh", backgroundColor: `${theme.palette.background.default}`}}>
				{isMobile && <Menu sx={{ml: "15px", mt: "10px"}} onClick={()=> {setMobileNavBarOpen(true);}} />}
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
				<Route element={userData?.state.loggedIn && userData?.state.rol !== "student" ? <CreereCurs /> : <Navigate replace={true} to="/"/>} path="creere_curs"/>
				<Route element={userData?.state.loggedIn && (userData?.state.rol === "secretar" || userData?.state.rol === "admin") ? <PanouAdmin /> : <Navigate replace={true} to="/"/>} path="admin"/>
				<Route element={userData?.state.loggedIn ? <DetaliiCurs /> : <Navigate replace={true} to="/"/>} path="detalii_curs"/>
				<Route element={userData?.state.loggedIn && userData?.state.rol !== "student" ? <StergereCurs /> : <Navigate replace={true} to="/"/>} path="stergere_curs"/>
			</Route>
		</Routes>
	);
}

export default App;
