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