import { Box, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { theme } from "../utils/material-ui-theme";

export const DetaliiCurs: React.FC = () => {
	const location = useLocation();
	console.log(location);
	return <Box sx={{width: "100%", height: "100vh", backgroundColor: `${theme.palette.background.default}`, display: "flex", justifyContent: "center", alignItems: "center"}}>
		<Box sx={{width: "90%", height: "auto"}}>
			<Typography>Coo Koo</Typography>
		</Box>
	</Box>;
};