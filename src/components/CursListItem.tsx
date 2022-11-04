import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { theme } from "../utils/material-ui-theme";

interface CursListItemProps {
    id: string;
    nume: string;
    anCurs: number;
    tipCurs: string;
    tipPrezentareCurs: string;
    dataSustinereCurs: {numarOra: number; numarZi: number;};
}

export const CursListItem: React.FC<CursListItemProps> = ({id, nume, anCurs, dataSustinereCurs}) => {
    return (
        <Box sx={{display: "flex", width: "95%", height: "96px", alignItems: "center", justifyContent: "space-between", borderBottom: "solid #D9D9D9 1px"}}>
            <Box sx={{display: "flex", flexDirection: "column"}}>
               <Typography variant="h3">{`${dataSustinereCurs.numarOra}:00 - ${dataSustinereCurs.numarOra + 2}:00`}</Typography>
               <Typography variant="h4">{nume}</Typography>
            </Box>
            <Button variant="outlined" 
                sx={{
                "&:hover": {
                    backgroundColor: `${theme.palette.primary.main}`,
                    color: `${theme.palette.secondary.light}`
                }}}
                onClick={()=> {console.log(`Wa Hoo!`)}}
                >Mai multe detalii&gt;&gt;
            </Button>
        </Box>
    );
}