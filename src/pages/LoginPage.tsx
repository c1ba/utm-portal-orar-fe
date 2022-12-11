import { useLazyQuery } from "@apollo/client";
import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { GASIRE_USER_DUPA_ID } from "../utils/apollo/queries";

export const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const [logId, setLogId] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [getUser] = useLazyQuery(GASIRE_USER_DUPA_ID, {});
	const userData = useUserContext();

	const handleSubmit = async () => {
		await getUser({variables: {gasireUserId: logId}}).then((response)=> {
			if(response.data) {
				const newState = userData?.state;
				if (newState) {
					newState._id = response.data.gasireUser._id;
					newState.nume = response.data.gasireUser.nume;
					newState.mail = response.data.gasireUser.eMail;
					newState.numarTelefon = response.data.gasireUser.numartelefon;
					newState.rol = response.data.gasireUser.rol.tip;
					newState.facultati = response.data.gasireUser.rol.facultati;
					newState.loggedIn = true;
					userData.setState({
						...userData.state, 
						nume: newState.nume, 
						mail: newState.mail, 
						numarTelefon: newState.numarTelefon, 
						rol: newState.rol, 
						facultati: newState.facultati, 
						loggedIn: newState.loggedIn
					});
					if (!document.cookie) {
						document.cookie = `uid=${logId}; expires=${new Date().setHours(new Date().getHours() + 1)}`;
					}
					navigate("/home");
				}
			}
			else {
				setError("Autentificare Nereusita");
			}
		});
	};


	useEffect(()=> {
		const cookie = document.cookie;
		if (cookie) {
			const id = cookie.split("=")[1];
			setLogId(id);
			handleSubmit();
		}
	},[]);


	return (<Box sx={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
		<img src="/images/logo-UTM.webp" width="200px" height="200px" />
		<Typography variant="h1">Portal Orar</Typography>
		<TextField variant="standard" value={logId} placeholder="ID" onChange={(e)=> {setLogId(e.target.value);}} sx={{mb: "25px", mt: "25px"}} />
		{error && <Typography variant="subtitle1">{error}</Typography>}
		<Button variant="contained">
			<Typography variant="button" onClick={()=> {handleSubmit();}}>Log In</Typography>
		</Button>
	</Box>);
};