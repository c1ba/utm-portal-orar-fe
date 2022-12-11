export interface SustinereCursType {
    numarZi: number;
    numarOra: number;
}

export interface CursType {
    _id: string;
    nume: string;
    anCurs: number;
    tipPrezentareCurs: string;
    tipCurs: string;
    prezente: string[];
    datiSustinereCurs: SustinereCursType[];
    profesorCurs: UserType;
}

export interface RolFacultate {
    an?: number;
    facultate: FacultateType;
}

export interface FacultateType {
    _id: string;
    domeniu: string;
    cursuri: CursType[];
}

export interface RolType {
    _id: string;
    tip: string;
    an?: number;
    facultati: [{facultate: FacultateType}];
}

export interface UserType {
    _id: string;
    nume: string;
    numarTelefon: string;
    eMail: string;
    rol: RolType;
}