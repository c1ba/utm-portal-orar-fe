import { useMediaQuery, Box } from "@mui/material";
import React from "react";
import { FormularStergereCurs } from "../components/FormularStergereCurs";
import { theme } from "../utils/material-ui-theme";

export const StergereCurs: React.FC = () => {
	const isMobile = useMediaQuery("(max-width:600px)");
	return <Box sx={{width: isMobile ? "100vw" : "100%", height: "100vh", backgroundColor: `${theme.palette.background.default}`, display: "flex", justifyContent: "center", alignItems: "center"}}>
		<Box sx={{width: "90%", height: "auto"}}>
			<Box sx={{width: "100%", height: "828px", backgroundColor: `${theme.palette.secondary.light}`, borderRadius: "20px", display: "flex", justifyContent: "center"}}>
				<FormularStergereCurs />
			</Box>
		</Box>
	</Box>;
};