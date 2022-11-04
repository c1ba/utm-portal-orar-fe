import { useLazyQuery, useMutation } from "@apollo/client";
import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { GASIRE_USER_DUPA_ID } from "../utils/apollo/queries";
import { theme } from "../utils/material-ui-theme";

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [logId, setLogId] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [getUser] = useLazyQuery(GASIRE_USER_DUPA_ID, {});
    const userData = useUserContext();

    const handleSubmit = async () => {
        await getUser({variables: {gasireUserId: logId}}).then((response)=> {
            if(response.data) {
                console.log(response.data.gasireUser);
                const newState = userData?.state;
                if (newState) {
                    newState.nume = response.data.gasireUser.nume;
                    newState.mail = response.data.gasireUser.eMail;
                    newState.numarTelefon = response.data.gasireUser.numartelefon;
                    newState.rol = response.data.gasireUser.rol.__typename;
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
                    navigate('/home');
                }
            }
            else {
                setError('Autentificare Nereusita');
            }
        });
    }


    useEffect(()=> {
        console.log(logId);
    },[logId]);


    return (<Box sx={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
    <img src="/images/logo-UTM.webp" width="200px" height="200px" />
    <Typography variant="h1">Portal Orar</Typography>
    <TextField variant="standard" value={logId} placeholder="ID" onChange={(e)=> {setLogId(e.target.value)}} sx={{mb: "25px", mt: "25px"}}></TextField>
    {error && <Typography variant="subtitle1">{error}</Typography>}
    <Button variant="contained">
        <Typography variant="button" onClick={()=> {handleSubmit()}}>Log In</Typography>
    </Button>
    </Box>);
};