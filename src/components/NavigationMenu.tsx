import { Box, Button, Drawer, SwipeableDrawer, Typography } from "@mui/material";
import React, { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useSharedStatesHook } from "../hooks/useSharedStatesHook";
import { SelectareFacultateModal } from "./SelectareFacultateModal";

const rute = [
	{
		nume: "Orarul de astazi",
		ruta: "/home",
		accesPermis: ["student", "profesor", "secretar", "admin"],
		isMobile: true
	},
	{
		nume: "Orarul pe saptamana asta",
		ruta: "/orar_saptamana",
		accesPermis: ["student", "profesor", "secretar", "admin"],
		isMobile: true
	},
	{
		nume: "Creeaza Curs",
		ruta: "/creere_curs",
		accesPermis: ["profesor", "secretar", "admin"],
		isMobile: true
	},
	{
		nume: "Sterge Curs",
		ruta: "/stergere_curs",
		accesPermis: ["profesor", "secretar", "admin"],
		isMobile: true},
	{
		nume: "Panou Admin",
		ruta: "/admin",
		accesPermis: ["admin", "secretar"],
		isMobile: false
	}
];

interface NavMenuContentProps {
	isMobile: boolean;
}

const NavMenuContent: React.FC<NavMenuContentProps> = ({isMobile}) => {
	const userData = useUserContext();
	const name = userData?.state.nume !== "" ? `${userData?.state.nume.split(" ")[1].split("-")[0]} ${userData?.state.nume.split(" ")[0]}` : "";
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const butoaneRute = userData && userData !== null && rute.map((ruta, index)=> {return !isMobile ? ruta.accesPermis.includes(userData.state.rol) && (
		<Button
			key={`nav_${index}`}
			sx={{mt: "5px", mb: "5px"}}
			onClick={()=> {setSelectedIndex(index);}} 
			component={NavLink} 
			to={ruta.ruta} 
			variant={selectedIndex === index ? "contained" : "text"}>
			{ruta.nume}
		</Button>
	) : ruta.accesPermis.includes(userData.state.rol) && ruta.isMobile === true && (
		<Button
			key={`nav_${index}`}
			sx={{mt: "5px", mb: "5px"}}
			onClick={()=> {setSelectedIndex(index);}} 
			component={NavLink} 
			to={ruta.ruta} 
			variant={selectedIndex === index ? "contained" : "text"}>
			{ruta.nume}
		</Button>
	);
	});
	const [selectareFacultateModalOpen, setSelectareFacultateModalOpen] = useState<boolean>(false);

	const {getFacultateSelectata} = useSharedStatesHook();
	const facultateSelectata = useMemo(() => {const fac = getFacultateSelectata(); return fac && fac != null ? fac : null;}, [getFacultateSelectata()]);

	return <Box sx={{width: "358px", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center"}}>
		<img src="/images/logo-UTM.webp" width="128px" height="128px" style={{marginTop: "18px", marginBottom: "18px"}}/>
		<Typography variant="h3" sx={{textAlign: "center", fontWeight: 400}}>Bun venit, <b>{name}</b>!</Typography>
		<Box sx={{display: "flex", flexDirection: "column", mt: "65px"}}>
			{butoaneRute}
		</Box>
		<Button onClick={() => {setSelectareFacultateModalOpen(true);}}><Typography>{`${facultateSelectata !== null && facultateSelectata.facultate.domeniu} ${userData?.state.rol === "student" ? `(An ${facultateSelectata !== null && facultateSelectata.an})` : ""} ▼`}</Typography></Button>
		<SelectareFacultateModal isOpen={selectareFacultateModalOpen} setIsOpen={setSelectareFacultateModalOpen} />
	</Box>;
};

interface NavigationMenuProps {
	isMobile: boolean;
	isOpen?: boolean;
	setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({isMobile, isOpen, setIsOpen}) => {
	
	return (<>
		{!isMobile ? <Drawer open={true} anchor="left" BackdropProps={{style:{backgroundColor: "transparent", width: "358px"}}} sx={{width: "358px"}} disableEnforceFocus>
			<NavMenuContent isMobile={isMobile} />
		</Drawer> : 
			<SwipeableDrawer anchor="left" open={isOpen ? isOpen : false} onClose={()=> {setIsOpen && setIsOpen(false);}} onOpen={()=> {console.log("Kwa");}}>
				<NavMenuContent isMobile={isMobile} />
			</SwipeableDrawer>}</>
	);
};