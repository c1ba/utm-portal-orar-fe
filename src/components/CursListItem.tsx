import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { theme } from "../utils/material-ui-theme";
import { UserType } from "../utils/types/backend-data";

export interface CursListItemProps {
    id: string;
    nume: string;
    anCurs: number;
    tipCurs: string;
    tipPrezentareCurs: string;
    dataSustinereCurs: {numarOra: number; numarZi: number;};
	profesorCurs: UserType;
	prezenteStudenti: UserType[];
	absenteStudenti: UserType[];
}

export const CursListItem: React.FC<CursListItemProps> = ({id, nume, anCurs, dataSustinereCurs, profesorCurs, tipPrezentareCurs, tipCurs, prezenteStudenti, absenteStudenti}) => {
	const location = useLocation();
	const navigate = useNavigate();
	const userData = useUserContext();
	return (
		<Box sx={{display: "flex", width: "95%", height: "96px", alignItems: "center", justifyContent: "space-between", borderBottom: "solid #D9D9D9 1px"}}>
			<Box sx={{display: "flex", flexDirection: "column"}}>
				<Typography variant="h3">{`${dataSustinereCurs.numarOra}:00 - ${dataSustinereCurs.numarOra + 2}:00`}</Typography>
				<Typography variant="h4">{`${nume}${userData?.state.rol !== "student" && `(An ${anCurs})`}`}</Typography>
			</Box>
			<Button variant="outlined" 
				sx={{
					"&:hover": {
						backgroundColor: `${theme.palette.primary.main}`,
						color: `${theme.palette.secondary.light}`
					}}}
				onClick={()=> {navigate("../detalii_curs", {state: {_id: id, numeCurs: nume, anCurs: anCurs, dataSustinereCurs: dataSustinereCurs, profesorCurs: profesorCurs, tipPrezentareCurs: tipPrezentareCurs, tipCurs: tipCurs, studentiPrezenti: prezenteStudenti, studentiAbsenti: absenteStudenti, lastLocation: location.pathname}});}}
			>Mai multe detalii&gt;&gt;
			</Button>
		</Box>
	);
};