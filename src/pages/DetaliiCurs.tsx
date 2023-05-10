import { useMutation } from "@apollo/client";
import { Box, Button, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { EDITARE_ABSENTE_CURSURI, EDITARE_PREZENTE_CURS } from "../utils/apollo/queries";
import { theme } from "../utils/material-ui-theme";

export const DetaliiCurs: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const userData = useUserContext()?.state;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [state, setState] = React.useState<any>();
	const [motivAbsenta, setMotivAbsenta] = React.useState<string>("");
	const [absentaError, setAbsentaError] = React.useState<string>("");
	const [adaugarePrezenta] = useMutation(EDITARE_PREZENTE_CURS, {});
	const [adaugareAbsenta] = useMutation(EDITARE_ABSENTE_CURSURI, {});
	const [dejaConfirmat, setDejaConfirmat] = React.useState<boolean>(false);
	const [mesajRequest, setMesajRequest] = React.useState<string>("");
	const [listaStudenti, setListaStudenti] = React.useState<"lista_prezenti" | "lista_absenti">("lista_prezenti");
	
	React.useEffect(()=> {
		setState(location.state);
	},[]);

	React.useEffect(() => {
		const existaStudentulInVreoLista = state?.studentiPrezenti.find((s: {_id: string, nume: string})=> s._id === userData?._id) || state?.studentiAbsenti.find((s: {student: {_id: string, nume: string}, motiv: string}) => s.student._id === userData?._id);
		setDejaConfirmat(existaStudentulInVreoLista ? true : false);
	}, [state]);

	const absentaSubmit = async () => {
		const rezultat = await adaugareAbsenta({variables: {idCurs: state?._id, idUser: userData?._id, motivAbsenta: motivAbsenta}});
		if (!rezultat || rezultat.data === null) return;
		setMesajRequest("Ai confirmat absenta!");
		setDejaConfirmat(true);
	};

	const prezentaSubmit = async () => {
		const rezultat = await adaugarePrezenta({variables: {idCurs: state?._id, idUser: userData?._id}});
		if (!rezultat || rezultat.data === null) return;
		setMesajRequest("Ai confirmat prezenta!");
		setDejaConfirmat(true);
	};

	return <Box sx={{width: "100%", height: "100vh", backgroundColor: `${theme.palette.background.default}`, display: "flex", justifyContent: "center", alignItems: "center"}}>
		<Box sx={{width: "90%", height: "auto", display: "flex"}}>
			<Box sx={{width: "100%", height: "auto", backgroundColor: `${theme.palette.secondary.light}`, borderRadius: "20px", display: "flex", flexDirection: "column", alignitems: "center"}}>
				<Box sx={{width: "95%", mt: "15px", ml: "15px"}}>
					<Typography variant="h3" color="primary" onClick={()=> {navigate(`../${state?.lastLocation}`);}}>&lt;&lt; Inapoi</Typography>
				</Box>
				<Box sx={{width: "100%", height: "300px", textAlign: "center", mt: "100px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
					<Box>
						<Typography variant="h1">{state?.numeCurs}</Typography>
						<Typography variant="h3" sx={{fontWeight: 400}}>{state?.dataSustinereCurs.numarOra}:00 - {state?.dataSustinereCurs.numarOra + 2}:00</Typography>
						<Typography variant="h2">{state?.tipCurs}</Typography>
					</Box>
					<Typography variant="h2">Profesor: {state?.profesorCurs.nume}</Typography>
					{userData?.rol !== "student" && <Typography variant="h2">Anul: {state?.anCurs}</Typography>}
					<Typography variant="h2">Prezenta: {state?.tipPrezentareCurs.charAt(0).toUpperCase() + state?.tipPrezentareCurs.slice(1)}</Typography>
					{dejaConfirmat && <Typography variant="h4" color="primary">Deja ai confirmat daca vei veni sau nu la curs.</Typography>}
				</Box>
				{ userData && (userData?.rol === "student" || userData?.rol === "admin") && <>
					<Box sx={{width: "100%", display: "flex", justifyContent: "space-around", mt: "50px", mb: "25px"}}>
						<Button variant="contained" onClick={async ()=> {await prezentaSubmit();}} disabled={dejaConfirmat}>Confirma Prezenta</Button>
						<Button onClick={async ()=> {await absentaSubmit();}} disabled={(absentaError !== "") || dejaConfirmat}>Confirma Absenta</Button>
					</Box>
					<Box sx={{width: "100%", display: "flex", justifyContent: "center", mt: "50px", pb: "5%"}}>
						<TextField helperText={absentaError !== "" && absentaError} disabled={dejaConfirmat} error={absentaError !== ""} multiline sx={{width: "70%"}} placeholder="Am racit, am treaba la lucru, m-au chemat extraterestrii in misiunea mult asteptata de a explora unviersul, bla bla bla" label="Motiv Absenta" onChange={(e)=> {setMotivAbsenta(e.target.value); e.target.value === "" ? setAbsentaError("Nu poti sa chiulesti fara motiv..") : absentaError !== "" && setAbsentaError("");}} />
					</Box>
				</>}
				{userData && (userData?.rol === "profesor" || userData?.rol === "admin" || userData?.rol === "secretar") && <>
					<Box sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", mt: "50px"}}>
						<ToggleButtonGroup color="primary" exclusive value={listaStudenti} onChange={(e, val) =>{setListaStudenti(val);}}>
							<ToggleButton value="lista_prezenti">Prezente</ToggleButton>
							<ToggleButton value="lista_absenti">Absente</ToggleButton>
						</ToggleButtonGroup>
						<Box sx={{backgroundColor: `${theme.palette.background.default}`, width: "70%", mb: "25px", borderRadius: "14px", display: "flex", justifyContent: "center"}}>
							<Box sx={{mt: "5px", width: "90%"}}>
								{// eslint-disable-next-line @typescript-eslint/no-explicit-any
									listaStudenti === "lista_prezenti" && state?.studentiPrezenti.map((s: any, index: number)=> <Typography variant="h3" color="primary" key={`s_${index}`}>{s.nume}</Typography>)}
								{// eslint-disable-next-line @typescript-eslint/no-explicit-any
									listaStudenti === "lista_absenti" && state?.studentiAbsenti.map((s: any, index: number)=> <Box key={`s_${index}`}><Typography  variant="h3" color="primary">{s.student.nume}</Typography><Typography>{s.motiv}</Typography></Box>)}
							</Box>
						</Box>
					</Box>
				</>}
				{mesajRequest !== "" && <Typography variant="h2" color="primary">{mesajRequest}</Typography>}
			</Box>
		</Box>
	</Box>;
};