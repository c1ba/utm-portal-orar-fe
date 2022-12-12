import { Box, Button, Drawer, SwipeableDrawer, Typography } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

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

interface NavigationMenuProps {
	isMobile: boolean;
	isOpen?: boolean;
	setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({isMobile, isOpen, setIsOpen}) => {
	const userData = useUserContext();
	const name = userData?.state.nume !== "" ? `${userData?.state.nume.split(" ")[1].split("-")[0]} ${userData?.state.nume.split(" ")[0]}` : "";
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const butoaneRute = userData && rute.map((ruta, index)=> {return !isMobile ? ruta.accesPermis.includes(userData.state.rol) && (
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
	return (<>
		{!isMobile ? <Drawer open={true} anchor="left" BackdropProps={{style:{backgroundColor: "transparent", width: "358px"}}} sx={{width: "358px"}} disableEnforceFocus>
			<Box sx={{width: "358px", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center"}}>
				<img src="/images/logo-UTM.webp" width="128px" height="128px" style={{marginTop: "18px", marginBottom: "18px"}}/>
				<Typography variant="h3" sx={{textAlign: "center", fontWeight: 400}}>Bun venit, <b>{name}</b>!</Typography>
				<Box sx={{display: "flex", flexDirection: "column", mt: "65px"}}>
					{butoaneRute}
				</Box>
			</Box>
		</Drawer> : 
			<SwipeableDrawer anchor="left" open={isOpen ? isOpen : false} onClose={()=> {setIsOpen && setIsOpen(false);}} onOpen={()=> {console.log("Kwa");}}>
				<Box sx={{width: "358px", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center"}}>
					<img src="/images/logo-UTM.webp" width="128px" height="128px" style={{marginTop: "18px", marginBottom: "18px"}}/>
					<Typography variant="h3" sx={{textAlign: "center", fontWeight: 400}}>Bun venit, <b>{name}</b>!</Typography>
					<Box sx={{display: "flex", flexDirection: "column", mt: "65px"}}>
						{butoaneRute}
					</Box>
				</Box>
			</SwipeableDrawer>}</>
	);
};