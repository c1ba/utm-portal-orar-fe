import { useLazyQuery } from "@apollo/client";
import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { GASIRE_USER_DUPA_ID, LOGARE } from "../utils/apollo/queries";
import { decodeToken } from "react-jwt";

export const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const [eMailInput, setEMailInput] = useState<string>("");
	const [parola, setParola] = useState<string>("");
	const [cookieInit, setCookieInit] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [logare] = useLazyQuery(LOGARE, {});
	const [getUser] = useLazyQuery(GASIRE_USER_DUPA_ID, {});
	const userData = useUserContext();

	const handleSubmit = async () => {
		if (eMailInput === "" || parola === "") {
			setError("Campuri Goale");
		}
		await logare({variables: {email: eMailInput, parola: parola}}).then((response)=> {
			if(response.data.logare) {
				const decodedToken: {[key: string]: unknown} | null = decodeToken(response.data.logare);
				sessionStorage.setItem("token", `${response.data.logare}`);
				if (decodedToken) {
					getUser({variables: {gasireUserId: decodedToken.id}}).then((response) => {
						if (response.data.gasireUser && response.data.gasireUser !== null) {
							const newState = userData?.state;
							if (newState) {
								newState._id = response.data.gasireUser._id;
								newState.nume = response.data.gasireUser.nume;
								newState.eMail = response.data.gasireUser.eMail;
								newState.numarTelefon = response.data.gasireUser.numartelefon;
								newState.rol = response.data.gasireUser.rol.tip;
								newState.facultati = response.data.gasireUser.rol.facultati;
								newState.loggedIn = true;
								userData.setState({
									...userData.state, 
									nume: newState.nume, 
									eMail: newState.eMail, 
									numarTelefon: newState.numarTelefon, 
									rol: newState.rol, 
									facultati: newState.facultati, 
									loggedIn: newState.loggedIn
								});
								navigate("/home");
							}
						}
					});
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
			setEMailInput(id);
			setCookieInit(true);
		}
	},[]);

	useEffect(()=> {
		if (cookieInit && eMailInput !== "") {
			handleSubmit();
		}
	},[cookieInit]);


	return (<Box sx={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
		<img src="/images/logo-UTM.webp" width="200px" height="200px" />
		<Typography variant="h1">Portal Orar</Typography>
		<TextField variant="standard" value={eMailInput} placeholder="E-Mail" onChange={(e)=> {setEMailInput(e.target.value);}} sx={{mb: "25px", mt: "25px"}} />
		<TextField variant="standard" type="password" value={parola} placeholder="Parola" onChange={(e)=> {setParola(e.target.value);}} sx={{mb: "25px", mt: "25px"}} />
		{error && <Typography variant="subtitle1">{error}</Typography>}
		<Button variant="contained">
			<Typography variant="button" onClick={()=> {handleSubmit();}}>Log In</Typography>
		</Button>
	</Box>);
};