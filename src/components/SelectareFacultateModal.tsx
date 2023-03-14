import { Close } from "@mui/icons-material";
import { Button, Divider, Modal, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useUserContext } from "../context/UserContext";
import { useSharedStatesHook } from "../hooks/useSharedStatesHook";

interface SelectareFacultateModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SelectareFacultateModal: React.FC<SelectareFacultateModalProps> = ({isOpen, setIsOpen}) => {
	const userData = useUserContext();
	const isMobile = useMediaQuery("(max-width:600px)");
	const theme = useTheme();
	const {setFacultateSelectata} = useSharedStatesHook();
    
	const handleClose = () => {
		setIsOpen(false);
	};
	return userData && <Modal open={isOpen} onClose={handleClose} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
		<Box sx={{width: isMobile ? "90%" : "275px", height: isMobile ? "90%" : "500px", backgroundColor: theme.palette.background.default, borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center"}}>
			{isMobile && <Box sx={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
				<Close style={{height: "32px", width: "32px", marginRight: "10px"}} onClick={() => {handleClose();}} /></Box>}
			<Typography variant="h4" sx={{mt: "-20px"}}>Selectare Facultate</Typography>
			<Divider sx={{width: "95%", mt: "15px", mb: "15px"}} />
			{userData.state.facultati.map((facultate, index) => {
				return <Button key={`fac_${index}`} onClick={() => {setFacultateSelectata(facultate); handleClose();}}>{facultate.facultate.domeniu}</Button>;   
			})}
		</Box>
	</Modal>;
};