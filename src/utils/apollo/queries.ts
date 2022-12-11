import { gql } from "@apollo/client";

export const CREERE_FACULTATE_FARA_CURSURI = gql`
mutation CreereFacultate($domeniu: String!) {
  creereFacultate(facultate: {domeniu: $domeniu}) {
    _id
  }
}`;

export const GASIRE_TOTAL_USERI = gql`
query GasireTotiUseri {
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
mutation CreereCurs($numeCurs: String!, $anCurs: Int!, $idFacultate: ID!, $tipPrezentareCurs: String!, $tipCurs: String!, $sustineriCurs: [DataSustinereCursInput!]!, $profesorCursId: ID!) {
  creereCurs(curs: {nume: $numeCurs, anCurs: $anCurs, facultate: {_id: $idFacultate}, tipPrezentareCurs: $tipPrezentareCurs, tipCurs: $tipCurs, datiSustinereCurs: $sustineriCurs, profesorCurs: {_id: $profesorCursId}}) {
    anCurs
    datiSustinereCurs {
      numarOra
      numarZi
    }
    nume
    prezente
    tipCurs
    tipPrezentareCurs
    _id
  }
}`;

export const GET_CURSURI = gql`
query GasireTotalCursuri {
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
query GasireUser($gasireUserId: String!) {
  gasireUser(id: $gasireUserId) {
    _id
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

export const GASIRE_CURSURI_DUPA_FACULTATE_ID = gql`
query GasireCursuri($gasireFacultateId: String!) {
  gasireFacultate(id: $gasireFacultateId) {
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
      prezente
      profesorCurs {
        nume
      }
    }
  }
}`;

export const GASIRE_TOTAL_FACULTATI = gql`
query GasireTotalFacultati {
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
mutation CreereFacultate($domeniuFacultate: String!) {
  creereFacultate(facultate: {domeniu: $domeniuFacultate}) {
    domeniu
  }
}`;

export const STERGERE_CURS_DUPA_ID = gql`
mutation StergereCurs($stergereCursId: String!) {
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