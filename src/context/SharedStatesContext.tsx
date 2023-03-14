import React, {createContext, useContext, useState} from "react";
import { RolFacultate } from "../utils/types/backend-data";


type SharedStatesContextProps = {
    children: React.ReactNode;
}

export interface SharedStatesType {
    facultateSelectata: RolFacultate | null;
}

export type SharedStatesContextType = {
    state: SharedStatesType;
    setState: React.Dispatch<React.SetStateAction<SharedStatesType>>;
}

const initialState: SharedStatesType = {
	facultateSelectata: null
};

export const SharedStatesContext = createContext<SharedStatesContextType | null>(null);

export const useSharedStatesContext = () => {
	return useContext(SharedStatesContext);
};

export const SharedStatesprovider = ({children}: SharedStatesContextProps) => {
	const [state, setState] = useState<SharedStatesType>(initialState);

	return(
		<SharedStatesContext.Provider value={{state, setState}}>
			{children}
		</SharedStatesContext.Provider>
	);
};