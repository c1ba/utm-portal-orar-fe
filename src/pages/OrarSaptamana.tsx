import { useLazyQuery } from "@apollo/client";
import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CursListItem } from "../components/CursListItem";
import { useUserContext } from "../context/UserContext";
import { useSharedStatesHook } from "../hooks/useSharedStatesHook";
import { GASIRE_CURSURI_DUPA_FACULTATE_ID } from "../utils/apollo/queries";
import { theme } from "../utils/material-ui-theme";
import { CursBEType, CursType } from "../utils/types/backend-data";

export const OrarSaptamana: React.FC = () => {
	const userData = useUserContext();
	const [getCursuri] = useLazyQuery(GASIRE_CURSURI_DUPA_FACULTATE_ID, {});
	const [cursuri, setCursuri] = useState<CursBEType[]>([]);
	const [ziSelectata, setZiSelectata] = useState<number>(new Date().getDay());
	const {getFacultateSelectata} = useSharedStatesHook();
    
	useEffect(()=> {
		const facultateSelectata = getFacultateSelectata();
		if (userData?.state.facultati && userData?.state.facultati.length > 0 && facultateSelectata && facultateSelectata !== null) {
			getCursuri({variables: {gasireFacultateId: facultateSelectata.facultate._id}}).then((response)=> {
				setCursuri(response.data.gasireFacultate.cursuri.filter((curs: CursType)=> userData.state.rol === "student" ? curs.anCurs === facultateSelectata.an : curs));
			});
		}
	},[getFacultateSelectata()]);

	return <Box sx={{width: "100%", height: "100vh", backgroundColor: `${theme.palette.background.default}`, display: "flex", justifyContent: "center", alignItems: "center"}}>
		<Box sx={{width: "90%", height: "auto"}}>
			<Typography sx={{mb: "5px"}}>Orarul pentru saptamana asta</Typography>
			<ToggleButtonGroup exclusive value={ziSelectata} onChange={(e, val)=> {setZiSelectata(val);}} color="primary">
				<ToggleButton value={1}>Luni</ToggleButton>
				<ToggleButton value={2}>Marti</ToggleButton>
				<ToggleButton value={3}>Miercuri</ToggleButton>
				<ToggleButton value={4}>Joi</ToggleButton>
				<ToggleButton value={5}>Vineri</ToggleButton>
			</ToggleButtonGroup>
			<Box sx={{width: "100%", height: "828px", backgroundColor: `${theme.palette.secondary.light}`, borderRadius: "20px", display: "flex", justifyContent: "center"}}>
				<Box sx={{height: "95%", width: "95%"}}>
					{cursuri.map((curs, index)=> { 
						const foundTodaysCourse = curs.datiSustinereCurs.filter((data)=> data.numarZi === ziSelectata);
						if (foundTodaysCourse && foundTodaysCourse.length > 0) {
							for (let i = 0; i < foundTodaysCourse.length; i++) {
								return <CursListItem key={`curs_${index}`} id={curs._id} nume={curs.nume} profesorCurs={curs.profesorCurs} anCurs={curs.anCurs} tipCurs={curs.tipCurs} tipPrezentareCurs={curs.tipPrezentareCurs} dataSustinereCurs={foundTodaysCourse[i]} prezenteStudenti={curs.studentiPrezenti} absenteStudenti={curs.studentiAbsenti}/>;
							}
						}
					}
					)}
				</Box>
			</Box>
		</Box>
	</Box>;
};