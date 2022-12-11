import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { theme } from "../utils/material-ui-theme";

export const DetaliiCurs: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [state, setState] = React.useState<any>();
	const [motivAbsenta, setMotivAbsenta] = React.useState<string>("");
	const [absentaError, setAbsentaError] = React.useState<string>("");
	
	React.useEffect(()=> {
		setState(location.state);
	},[]);

	const absentaSubmit = () => {
		console.log(motivAbsenta);
	};

	const prezentaSubmit = () => {
		console.log("Kaka");
	};

	return <Box sx={{width: "100%", height: "100vh", backgroundColor: `${theme.palette.background.default}`, display: "flex", justifyContent: "center", alignItems: "center"}}>
		<Box sx={{width: "90%", height: "auto", display: "flex"}}>
			<Box sx={{width: "100%", height: "828px", backgroundColor: `${theme.palette.secondary.light}`, borderRadius: "20px", display: "flex", flexDirection: "column", alignitems: "center"}}>
				<Box sx={{width: "95%", mt: "15px", ml: "15px"}}>
					<Typography variant="h3" color="primary" onClick={()=> {navigate("../home");}}>&lt;&lt; Inapoi</Typography>
				</Box>
				<Box sx={{width: "100%", height: "40%", textAlign: "center", mt: "100px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
					<Box>
						<Typography variant="h1">{state?.numeCurs}</Typography>
						<Typography variant="h3" sx={{fontWeight: 400}}>{state?.dataSustinereCurs.numarOra}:00 - {state?.dataSustinereCurs.numarOra + 2}:00</Typography>
						<Typography variant="h2">{state?.tipCurs}</Typography>
					</Box>
					<Typography variant="h2">Profesor: {state?.profesorCurs.nume}</Typography>
					<Typography variant="h2">Prezenta: {state?.tipPrezentareCurs.charAt(0).toUpperCase() + state?.tipPrezentareCurs.slice(1)}</Typography>
				</Box>
				<Box sx={{width: "100%", display: "flex", justifyContent: "space-around", mt: "50px"}}>
					<Button variant="contained" onClick={()=> {prezentaSubmit();}}>Confirma Prezenta</Button>
					<Button onClick={()=> {absentaSubmit();}} disabled={absentaError !== ""}>Confirma Absenta</Button>
				</Box>
				<Box sx={{width: "100%", display: "flex", justifyContent: "center", mt: "50px"}}>
					<TextField helperText={absentaError !== "" && absentaError} error={absentaError !== ""} multiline sx={{width: "70%"}} placeholder="Am racit, am treaba la lucru, m-au chemat extraterestrii in misiunea mult asteptata de a explora unviersul, bla bla bla" label="Motiv Absenta" onChange={(e)=> {setMotivAbsenta(e.target.value); e.target.value === "" ? setAbsentaError("Nu poti sa chiulesti fara motiv..") : absentaError !== "" && setAbsentaError("");}} />
				</Box>
			</Box>
		</Box>
	</Box>;
};