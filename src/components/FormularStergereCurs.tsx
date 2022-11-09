import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { ExpandMore } from "@mui/icons-material";
import { Button, CircularProgress, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { GASIRE_CURSURI_DUPA_FACULTATE_ID, GASIRE_TOTAL_FACULTATI, STERGERE_CURS_DUPA_ID } from "../utils/apollo/queries";
import { CursType, SustinereCursType } from "../utils/types/backend-data";

interface CursStergereListItemProps {
	nume: string;
	datiSustinereCurs: SustinereCursType[];
	handleDelete: ()=>void;
	anSustinere: number;
}

const CursStergereListItem: React.FC<CursStergereListItemProps> = ({nume, datiSustinereCurs, handleDelete, anSustinere}) => {
	const zile = ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"];
	const [datiDropdown, setDatiDropdown] = useState<boolean>(false);
	return <Box sx={{display: "flex", flexDirection: "column", mt: "10px", mb: "10px"}}>
		<Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "400px", height: "auto"}}>
			<Box sx={{height: "100%", display: "flex", justifyContent: "center", flexDirection: "column"}}>
				<Box sx={{width: "100%"}}>
					<Typography variant="h4">{nume}</Typography>
					<Typography variant="body2" sx={{fontSize: "15px"}}>An {anSustinere}</Typography>
					<Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "150px"}}>
						<Typography variant="body1">Datile Cursului</Typography><ExpandMore onClick={()=> {setDatiDropdown(!datiDropdown);}}/>
					</Box>
				</Box>
			</Box>
			<Button variant="outlined" onClick={handleDelete}>Sterge</Button>
		</Box>
		<Box>
			{datiDropdown && datiSustinereCurs.map((data, index)=> <Typography variant="body2" key={`dati_${index}`}>{`${zile[data.numarZi]}, ${data.numarOra}:00 - ${data.numarOra + 2}:00`}</Typography>)}
		</Box>
	</Box>;
};

export const FormularStergereCurs: React.FC = () => {
	const {data, error, refetch} = useQuery(GASIRE_TOTAL_FACULTATI, {});
	const [getCursuriFacultate] = useLazyQuery(GASIRE_CURSURI_DUPA_FACULTATE_ID, {});
	const [facultati, setFacultati] = useState<{_id: string; domeniu: string;}[]>([]);
	const [facultate, setFacultate] = useState<string>("");
	const [cursuri, setCursuri] = useState<CursType[]>([]);
	const [confirmationMessage, setConfirmationMessage] = useState<string>("");
	const [stergereCurs] = useMutation(STERGERE_CURS_DUPA_ID, {refetchQueries: [{query: GASIRE_TOTAL_FACULTATI}, "stergereCurs"]});

	const handleStergereCurs = (id: string) => {
		stergereCurs({variables: {stergereCursId: id}}).then((response)=> {
			console.log(response);
			if (response.data.stergereCurs) {
				setCursuri(cursuri.filter((curs)=> curs._id !== response.data.stergereCurs._id));
				refetch();
			}
			if (response.data === null) {
				setConfirmationMessage("Nu s-a putut sterge cursul.");
			}
		});
	};

	useEffect(()=> {
		if (data && data.gasireTotalFacultati) {
			setFacultati(data.gasireTotalFacultati);
		}
	},[data]);


	if (data) {
		return <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
			<TextField select value={facultate} label="Facultatea de care apartine" required sx={{width: "285px", mt: "36px"}} onChange={(e)=> {
				setFacultate(e.target.value);
				getCursuriFacultate({variables: {gasireFacultateId: e.target.value}}).then((response)=> { 
					console.log(response);
					if (response.data.gasireFacultate.cursuri) setCursuri(response.data.gasireFacultate.cursuri);
				});
			}}>
				{facultati && facultati.map((facultate, index)=> <MenuItem key={`fac_${index}`} value={facultate._id}>{facultate.domeniu}</MenuItem>)}
			</TextField>
			<Box sx={{mt: "25px"}}>
				{cursuri && cursuri.length > 0 && cursuri.map((curs, index)=> {return <CursStergereListItem key={`curs_${index}`} anSustinere={curs.anCurs} nume={curs.nume} datiSustinereCurs={curs.datiSustinereCurs} handleDelete={()=> {handleStergereCurs(curs._id);}}/>;})}
			</Box>
			{confirmationMessage !== "" && <Typography variant="body1">{confirmationMessage}</Typography>}
		</Box>;
	}

	if (error) {
		return <></>;
	}

	return <CircularProgress variant="indeterminate" color="primary"/>;
};