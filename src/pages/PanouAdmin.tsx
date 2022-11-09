import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import { theme } from "../utils/material-ui-theme";
import { FormularCreereCurs } from "../components/FormularCreereCurs";
import { FormularStergereCurs } from "../components/FormularStergereCurs";
import { FormularCreereFacultate } from "../components/FormularCreereFacultate";

export const PanouAdmin: React.FC = () => {
	const [optiune, setOptiune] = useState<string>("creere_curs");
	return <Box sx={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
		<Box sx={{width: "90%", height: "auto"}}>
			<Typography variant="h3" sx={{fontWeight: 400, mb: "5px"}}>Panou Admin</Typography>
			<Box sx={{width: "100%", height: "828px", backgroundColor: `${theme.palette.secondary.light}`, borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
				<ToggleButtonGroup color="primary" exclusive value={optiune} onChange={(e, value)=> {setOptiune(value);}} sx={{mt: "15px"}}>
					<ToggleButton value="creere_curs" sx={{width: "220px", height: "44px"}}>Creere Curs</ToggleButton>
					<ToggleButton value="stergere_curs" sx={{width: "220px", height: "44px"}}>Stergere Curs</ToggleButton>
					<ToggleButton value="creere_facultate" sx={{width: "220px", height: "44px"}}>Creere Facultate</ToggleButton>
					<ToggleButton value="stergere_facultate" sx={{width: "220px", height: "44px"}}>Stergere Facultate</ToggleButton>
				</ToggleButtonGroup>
				<Box sx={{height: "100%", width: "100%", display: "flex", justifyContent: "center"}}>
					{optiune === "creere_curs" && <FormularCreereCurs />}
					{optiune === "stergere_curs" && <FormularStergereCurs />}
					{optiune === "creere_facultate" && <FormularCreereFacultate />}
				</Box>
			</Box>
		</Box>
	</Box>;
};