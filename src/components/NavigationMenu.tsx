import { Box, Button, Drawer, Typography } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const rute = [
	{
		nume: "Orarul de astazi",
		ruta: "/home",
		accesPermis: ["student", "profesor", "secretar", "admin"],
	},
	{
		nume: "Orarul pe saptamana asta",
		ruta: "/orar_saptamana",
		accesPermis: ["student", "profesor", "secretar", "admin"],
	},
	{
		nume: "Creeaza Curs",
		ruta: "/creere_curs",
		accesPermis: ["profesor", "secretar"],
	},
	{
		nume: "Panou Admin",
		ruta: "/admin",
		accesPermis: ["admin"],
	}
];

export const NavigationMenu: React.FC = () => {
	const userData = useUserContext();
	const name = userData?.state.nume !== "" ? `${userData?.state.nume.split(" ")[1].split("-")[0]} ${userData?.state.nume.split(" ")[0]}` : "";
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const butoaneRute = userData && rute.map((ruta, index)=> {return ruta.accesPermis.includes(userData.state.rol) && (
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
	return (

		<Drawer open={true} anchor="left" BackdropProps={{style:{backgroundColor: "transparent", width: "358px"}}} sx={{width: "358px"}} disableEnforceFocus>
			<Box sx={{width: "358px", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center"}}>
				<img src="/images/logo-UTM.webp" width="128px" height="128px" style={{marginTop: "18px", marginBottom: "18px"}}/>
				<Typography variant="h3" sx={{textAlign: "center", fontWeight: 400}}>Bun venit, <b>{name}</b>!</Typography>
				<Box sx={{display: "flex", flexDirection: "column", mt: "65px"}}>
					{butoaneRute}
				</Box>
			</Box>
		</Drawer>
	);
};