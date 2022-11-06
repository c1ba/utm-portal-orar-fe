import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import { theme } from "../utils/material-ui-theme";
import { FormularCreereCurs } from "./FormularCreereCurs";

export const PanouAdmin: React.FC = () => {
	const [optiune, setOptiune] = useState<string>("creere_curs");
	return <Box sx={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
		<Box sx={{width: "90%", height: "auto"}}>
			<Typography variant="h3" sx={{fontWeight: 400, mb: "5px"}}>Creeaza Curs</Typography>
			<Box sx={{width: "100%", height: "828px", backgroundColor: `${theme.palette.secondary.light}`, borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
				<ToggleButtonGroup color="primary" exclusive value={optiune} onChange={(e, value)=> {setOptiune(value);}}>
					<ToggleButton value="creere_curs" sx={{width: "220px", height: "44px"}}>Creere Curs</ToggleButton>
					<ToggleButton value="stergere_curs" sx={{width: "220px", height: "44px"}}>Stergere Curs</ToggleButton>
					<ToggleButton value="creere_facultate" sx={{width: "220px", height: "44px"}}>Creere Facultate</ToggleButton>
					<ToggleButton value="stergere_facultate" sx={{width: "220px", height: "44px"}}>Stergere Facultate</ToggleButton>
				</ToggleButtonGroup>
				{optiune === "creere_curs" && <FormularCreereCurs />}
			</Box>
		</Box>
	</Box>;
};