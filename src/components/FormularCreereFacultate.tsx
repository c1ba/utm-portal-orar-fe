import { TextField } from "@mui/material";
import React, { useState } from "react";

export const FormularCreereFacultate: React.FC = () => {
	const [domeniu, setDomeniu] = useState<string>("");
	return <>
		<TextField label="Domeniul Facultatii" value={domeniu} onChange={(e) => {setDomeniu(e.target.value);}}/>
	</>;
};