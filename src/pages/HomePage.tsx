import { useLazyQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, {useEffect, useState} from "react";
import { CursListItem } from "../components/CursListItem";
import { useUserContext } from "../context/UserContext";
import { useSharedStatesHook } from "../hooks/useSharedStatesHook";
import { GASIRE_CURSURI_DUPA_FACULTATE_ID } from "../utils/apollo/queries";
import { DataInRomana } from "../utils/convertor-functions";
import { theme } from "../utils/material-ui-theme";
import { CursBEType, CursType } from "../utils/types/backend-data";
export const HomePage: React.FC = () => {

	const userData = useUserContext();
	const [getCursuri] = useLazyQuery(GASIRE_CURSURI_DUPA_FACULTATE_ID, {fetchPolicy: "no-cache"});
	const [cursuri, setCursuri] = useState<CursBEType[]>([]);
	const {getFacultateSelectata} = useSharedStatesHook();
    
	useEffect(()=> {
		const facultateSelectata = getFacultateSelectata();
		if (userData?.state.facultati && userData?.state.facultati.length > 0 && facultateSelectata) {
			getCursuri({variables: {gasireFacultateId: facultateSelectata.facultate._id}}).then((response)=> {
				setCursuri(response.data.gasireFacultate.cursuri.filter((curs: CursType)=> userData.state.rol === "student" ? curs.anCurs === facultateSelectata.an : curs));
			});
		}
	},[getFacultateSelectata()]);

	return <Box sx={{width: "100%", height: "100vh", backgroundColor: `${theme.palette.background.default}`, display: "flex", justifyContent: "center", alignItems: "center"}}>
		<Box sx={{width: "90%", height: "auto"}}>
			<Typography sx={{mb: "5px"}}>Orarul pentru astazi, <b>{DataInRomana(new Date())}</b></Typography>
			<Box sx={{width: "100%", height: "828px", backgroundColor: `${theme.palette.secondary.light}`, borderRadius: "20px", display: "flex", justifyContent: "center"}}>
				<Box sx={{height: "95%", width: "95%"}}>
					{cursuri.map((curs, index)=> { 
						const today = new Date(), foundTodaysCourse = curs.datiSustinereCurs.find((data)=> data.numarZi === today.getDay());
						if (foundTodaysCourse) {
							return <CursListItem key={`curs_${index}`} id={curs._id} nume={curs.nume} profesorCurs={curs.profesorCurs} anCurs={curs.anCurs} tipCurs={curs.tipCurs} tipPrezentareCurs={curs.tipPrezentareCurs} dataSustinereCurs={foundTodaysCourse} prezenteStudenti={curs.studentiPrezenti} absenteStudenti={curs.studentiAbsenti}/>;
						}
					}
					)}
				</Box>
			</Box>
		</Box>
	</Box>;
};