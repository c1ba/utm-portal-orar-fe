import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { FormularCreereCurs } from "../components/FormularCreereCurs";
import { theme } from "../utils/material-ui-theme";

export const CreereCurs: React.FC = () => {
	const isMobile = useMediaQuery("(max-width:600px)");
	return <Box sx={{width: isMobile ? "100vw" : "100%", height: "100vh", backgroundColor: `${theme.palette.background.default}`, display: "flex", justifyContent: "center", alignItems: "center"}}>
		<Box sx={{width: "90%", height: "auto"}}>
			<Box sx={{width: "100%", height: "828px", backgroundColor: `${theme.palette.secondary.light}`, borderRadius: "20px", display: "flex", justifyContent: "center"}}>
				<FormularCreereCurs />
			</Box>
		</Box>
	</Box>;
};