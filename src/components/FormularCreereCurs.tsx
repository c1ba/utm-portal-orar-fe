import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Add, Clear } from "@mui/icons-material";
import { Box, Button, CircularProgress, MenuItem, TextField, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { CREERE_CURS, GASIRE_TOTAL_FACULTATI, GASIRE_TOTAL_USERI } from "../utils/apollo/queries";
import {SustinereCursType, UserType} from "../utils/types/backend-data";

interface ComponentaDateSustinereInputProps {
    ziOraCombo: SustinereCursType[];
    index: number;
    setZiOra: React.Dispatch<React.SetStateAction<SustinereCursType[]>>;
}

const ComponentaDateSustinereInput: React.FC<ComponentaDateSustinereInputProps> = ({ziOraCombo, setZiOra, index}) => {
	const date = ziOraCombo.find((zO, i)=> index === i);
	return(
		<Box sx={{display: "flex", justifyContent: "space-between", mt: index > 0 ? "36px" : "0px", width: "100%"}}>
			<TextField variant="outlined" label="Ora Cursului" type="number" InputProps={{inputProps: {min: 0, max: 23}}} value={date?.numarOra} onChange={(e)=> {setZiOra(ziOraCombo.map((zO, i)=> {if (i === index) {return {...zO, numarOra: parseInt(e.target.value)};} return zO;}));}} size="small"  sx={{width: "156px"}} required></TextField>
			<Box sx={{display: "flex", alignItems: "center"}}>
				<TextField select value={date?.numarZi} size="small" label="Ziua Cursului" required sx={{width: "185px"}} onChange={(e)=> {setZiOra(ziOraCombo.map((zO, i)=> {if (i === index) {return {...zO, numarZi: parseInt(e.target.value)};} return zO;}));}}>
					<MenuItem value={1}>Luni</MenuItem>
					<MenuItem value={2}>Marti</MenuItem>
					<MenuItem value={3}>Miercuri</MenuItem>
					<MenuItem value={4}>Joi</MenuItem>
					<MenuItem value={5}>Vineri</MenuItem>
				</TextField>
				{index > 0 && <Clear sx={{ml: "5px"}} onClick={()=> setZiOra(ziOraCombo.filter((zO, i)=> index !== i))}/>}
				{index === 0 && <Add sx={{ml: "5px"}} onClick={()=> {setZiOra([...ziOraCombo, {numarZi: 1, numarOra: 12}]);}} />}
			</Box>
		</Box>
	);
};

export const FormularCreereCurs: React.FC = () => {

	const isMobile = useMediaQuery("(max-width:600px)");
	const userData = useUserContext();

	const [numeCurs, setNumeCurs] = useState<string>("");
	const [anPredare, setAnPredare] = useState<number>(0);
	const [facultate, setFacultate] = useState<string>("");
	const [facultati, setFacultati] = useState<{_id: string; domeniu: string;}[]>([{_id: "1", domeniu: "test"}]);
	const [cursSauLab, setCursSauLab] = useState<string>("");
	const [fizicHibridSauOnline, setFizicHibridSauOnline] = useState<string>("");
	const [dateSustinereCurs, setDateSustinereCurs] = useState<SustinereCursType[]>([{numarZi: 1, numarOra: 12}]);
	const {data, error, refetch} = useQuery(GASIRE_TOTAL_FACULTATI, {});
	const [getUseri] = useLazyQuery(GASIRE_TOTAL_USERI, {});
	const [creeazaCurs] = useMutation(CREERE_CURS, {});
	const [confirmationMessage, setConfirmationMessage] = useState<string>("");
	const [listaProfesoriFacultate, setListaProfesoriFacultate] = useState([]);
	const [profSelectat, setProfSelectat] = useState<string>("");

	const handleSubmit = () => {
		creeazaCurs(
			{variables: {
				numeCurs: numeCurs,
				anCurs: anPredare,
				idFacultate: facultate,
				tipPrezentareCurs: fizicHibridSauOnline,
				tipCurs: cursSauLab,
				sustineriCurs: dateSustinereCurs,
				profesorCursId: profSelectat
			}
			}
		).then((response)=> {
			if (response.data.creereCurs) {
				setConfirmationMessage("Cursul s-a adaugat cu succes!");
				refetch();
			}
			if (response.data === null) {
				setConfirmationMessage("Nu am putut adauga cursul.");
			}
		});
	};

	useEffect(()=> {
		if (data && data.gasireTotalFacultati) {
			setFacultati(data.gasireTotalFacultati);
			if (userData?.state.rol === "profesor") {
				setProfSelectat(userData.state._id);
			}
		}
	},[data]);

	useEffect(()=> {
		if (facultate !== "" && data) {
			getUseri().then((r)=> {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const results = r.data.gasireTotiUseri.filter((user: UserType)=> {const domenii = user.rol.facultati.map((fac: any)=> fac.facultate._id); return user.rol.tip === "profesor" && domenii.find((dom: string)=> dom === facultate);});
				setListaProfesoriFacultate(results);
			});
		}
	},[facultate, data]);

	if (data) {
		return (
			<Box sx={{height: "95%", width: "95%", display: "flex", flexDirection: "column", alignItems: "center"}}>
				<Box sx={{width: "100%", height: "100%", display: "flex", justifyContent: isMobile ? "center" : "space-between", flexDirection: isMobile ? "column" : "row", mt: "150px"}}>
					<Box sx={{width: isMobile ? "100%" : "50%", height: "auto", display: "flex", flexDirection: "column", alignItems: isMobile ? "center" : "flex-start"}}>
						<TextField variant="outlined" label="Nume Curs" value={numeCurs} onChange={(e)=> {setNumeCurs(e.target.value);}} size="small"  sx={{width: isMobile ? "85%" : "497px"}} required></TextField>
						<TextField variant="outlined" label="An Predare" type="number" InputProps={{inputProps: {min: 0}}} value={anPredare} onChange={(e)=> {setAnPredare(parseInt(e.target.value));}} size="small"  sx={{width: "156px", mt: "36px"}} required></TextField>
						<TextField select value={facultate} label="Facultatea de care apartine" required sx={{width: "285px", mt: "36px"}} onChange={(e)=> {setFacultate(e.target.value);}}>
							{facultati && facultati.length > 0 && facultati.map((facultate, index)=> <MenuItem key={`fac_${index}`} value={facultate._id}>{facultate.domeniu}</MenuItem>)}
						</TextField>
						<TextField select value={profSelectat} label="Profesor Coordonator" required sx={{width: "285px", mt: "36px"}} onChange={(e)=> {setProfSelectat(e.target.value);}} disabled={userData?.state.rol === "profesor"}>
							{listaProfesoriFacultate && listaProfesoriFacultate.length > 0 ? listaProfesoriFacultate.map((profesor: UserType, index: number)=> <MenuItem key={`fac_${index}`} value={profesor._id}>{profesor.nume}</MenuItem>) : <MenuItem value="">Selecteaza o Facultate</MenuItem>}
						</TextField>
						<Box sx={{width: "100%", display: "flex", justifyContent: isMobile ? "center" : "space-between", mt: "36px"}}>
							<ToggleButtonGroup color="primary" exclusive value={cursSauLab} onChange={(e, value)=> {setCursSauLab(value);}}>
								<ToggleButton value="Curs" sx={{width: "220px", height: "44px"}}>Curs</ToggleButton>
								<ToggleButton value="Laborator" sx={{width: "220px", height: "44px"}}>Laborator</ToggleButton>
							</ToggleButtonGroup>
						</Box>
					</Box>
					<Box sx={{width: isMobile ? "100%" : "50%", height: "auto", display: "flex", flexDirection: "column", alignItems: isMobile ? "center" : "flex-start", mt: isMobile ? "15px" : "0"}}>
						<Box sx={{width: "100%", display: "flex", justifyContent: isMobile ? "center" : "space-between"}}>
							<ToggleButtonGroup sx={{width: isMobile ? "100%" : "auto"}} color="primary" exclusive value={fizicHibridSauOnline} onChange={(e, value)=> {setFizicHibridSauOnline(value);}}>
								<ToggleButton value="fizic" sx={{width: "220px", height: "44px"}}>Fizic</ToggleButton>
								<ToggleButton value="hibrid" sx={{width: "220px", height: "44px"}}>Hibrid</ToggleButton>
								<ToggleButton value="online" sx={{width: "220px", height: "44px"}}>Online</ToggleButton>
							</ToggleButtonGroup>
						</Box>
						<Box sx={{width: "100%", display: "flex", justifyContent: isMobile ? "center" : "space-between", mt: "36px"}}>
							<Box sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "70%"}}>
								{dateSustinereCurs && dateSustinereCurs.length > 0 && 
                                        dateSustinereCurs.map((zO, index) => <ComponentaDateSustinereInput key={`zO_${index}`} ziOraCombo={dateSustinereCurs} index={index} setZiOra={setDateSustinereCurs} />)}
							</Box>
						</Box>
					</Box>
				</Box>
				<Button variant="contained" onClick={()=> {handleSubmit();}} sx={{mb: "75px"}}>Confirma</Button>
				{confirmationMessage !== "" && <Typography variant="body1">{confirmationMessage}</Typography>}
			</Box>);
	}

	if (error) {
		console.log(error);
	}

	return <CircularProgress variant="indeterminate" color="primary"/>;
};