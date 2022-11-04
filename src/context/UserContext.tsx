import React, { createContext, ReactNode, useContext, useState } from "react";
import { FacultateType, RolFacultate } from "../utils/types/backend-data";

type UserContextProps = {
    children: ReactNode;
}

export interface InitialStateType {
    loggedIn: boolean;
    nume: string;
    mail: string;
    numarTelefon: string;
    rol: string;
    facultati: RolFacultate[];
}

export type UserContextType = {
    setState: React.Dispatch<React.SetStateAction<InitialStateType>>;
    state: InitialStateType
}

const initialState: InitialStateType = {
    loggedIn: false,
    nume: "",
    mail: "",
    numarTelefon: "",
    rol: "",
    facultati: [],
}

export const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
    return useContext(UserContext);
}

export const UserContextProvider = ({children}: UserContextProps) => {
    const [state, setState] = useState<InitialStateType>(initialState);

    return(
        <UserContext.Provider value={{state, setState}}>
            {children}
        </UserContext.Provider>
    )
}