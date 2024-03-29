import { gql } from "@apollo/client";

export const CREERE_FACULTATE_FARA_CURSURI = gql`
mutation creereFacultate($domeniu: String!) {
  creereFacultate(facultate: {domeniu: $domeniu}) {
    _id
  }
}`;

export const GASIRE_TOTAL_USERI = gql`
query gasireTotiUseri {
  gasireTotiUseri {
    _id
    nume
    rol {
      tip
      facultati {
        facultate {
          _id
          domeniu
        }
      }
    }
  }
}`;

export const CREERE_CURS = gql`
mutation creereCurs($numeCurs: String!, $anCurs: Int!, $idFacultate: ID!, $tipPrezentareCurs: String!, $tipCurs: String!, $sustineriCurs: [DataSustinereCursInput!]!, $profesorCursId: ID!) {
  creereCurs(curs: {nume: $numeCurs, anCurs: $anCurs, facultate: {_id: $idFacultate}, tipPrezentareCurs: $tipPrezentareCurs, tipCurs: $tipCurs, datiSustinereCurs: $sustineriCurs, profesorCurs: {_id: $profesorCursId}}) {
    anCurs
    datiSustinereCurs {
      numarOra
      numarZi
    }
    nume
    tipCurs
    tipPrezentareCurs
    _id
  }
}`;

export const GET_CURSURI = gql`
query gasireTotalCursuri {
    gasireTotalCursuri {
      nume
      facultate {
        domeniu
      }
      tipCurs
      tipPrezentareCurs
      anCurs
    }
  }
`;

export const GASIRE_USER_DUPA_ID = gql`
query gasireUser($gasireUserId: String!) {
  gasireUser(id: $gasireUserId) {
    eMail
    numarTelefon
    nume
    rol {
      tip
      persoana {
        _id
      }
      facultati {
        an
        facultate {
          _id
          domeniu
        }
      }
    }
  }
}`;

export const LOGARE = gql`
query logare($email: String!, $parola: String!) {
  logare(email: $email, parola: $parola)
}`;

export const EDITARE_PREZENTE_CURS = gql`
mutation confirmarePrezentaLaCurs($idUser: ID!, $idCurs: ID!) {
  confirmarePrezentaLaCurs(args: {idCurs: $idCurs, idUser: $idUser}) {
    studentiPrezenti {
      _id
      nume
    }
  }
}`;

export const EDITARE_ABSENTE_CURSURI = gql`
mutation confirmareAbsentaLaCurs($idUser: ID!, $idCurs: ID!, $motivAbsenta: String!) {
  confirmareAbsentaLaCurs(args: {idCurs: $idCurs, idUser: $idUser, motivAbsenta: $motivAbsenta}) {
    studentiPrezenti {
      _id
      nume
    }
  }
}`;

export const GASIRE_CURSURI_DUPA_FACULTATE_ID = gql`
query gasireFacultate($gasireFacultateId: String!) {
  gasireFacultate(id: $gasireFacultateId) {
    domeniu
    cursuri {
      _id
      nume
      tipCurs
      tipPrezentareCurs
      datiSustinereCurs {
        numarOra
        numarZi
      }
      anCurs
      profesorCurs {
        _id
        nume
      }
      studentiPrezenti {
        _id
        nume
      }
      studentiAbsenti {
        student {
          _id
        nume
        }
        motiv
      }
    }
  }
}`;

export const GASIRE_CURSURI_FORMULAR_STERGERE = gql`
query gasireFacultate($gasireFacultateId: String!) {
  gasireFacultate(id: $gasireFacultateId) {
    domeniu
    cursuri {
      _id
      nume
      tipCurs
      tipPrezentareCurs
      datiSustinereCurs {
        numarOra
        numarZi
      }
      anCurs
      profesorCurs {
        _id
        nume
      }
    }
  }
}`;

export const GASIRE_TOTAL_FACULTATI = gql`
query gasireTotalFacultati {
  gasireTotalFacultati {
    _id
    domeniu
    cursuri {
      _id
      nume
      tipCurs
      tipPrezentareCurs
      datiSustinereCurs {
        numarOra
        numarZi
      }
      anCurs
    }
  }
}`;

export const CREERE_FACULTATE = gql`
mutation creereFacultate($domeniuFacultate: String!) {
  creereFacultate(facultate: {domeniu: $domeniuFacultate}) {
    domeniu
  }
}`;

export const STERGERE_CURS_DUPA_ID = gql`
mutation stergereCurs($stergereCursId: String!) {
  stergereCurs(id: $stergereCursId) {
    _id
    nume
    facultate {
      cursuri {
        _id
        nume
        datiSustinereCurs {
          numarOra
          numarZi
        }
        anCurs
        tipCurs
        tipPrezentareCurs
      }
    }
  }
}`;