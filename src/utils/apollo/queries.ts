import { gql } from "@apollo/client";

export const CREERE_CURS = gql`
mutation Mutation($numeCurs: String!, $anCurs: Int!, $idFacultate: ID!, $tipPrezentareCurs: String!, $tipCurs: String!, $sustineriCurs: [DataSustinereCursInput!]!) {
  creereCurs(curs: {nume: $numeCurs, anCurs: $anCurs, facultate: {_id: $idFacultate}, tipPrezentareCurs: $tipPrezentareCurs, tipCurs: $tipCurs, datiSustinereCurs: $sustineriCurs}) {
    anCurs
    datiSustinereCurs {
      numarOra
      numarZi
    }
    nume
    prezente
    tipCurs
    tipPrezentareCurs
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
query Query($gasireFacultateId: String!) {
  gasireFacultate(id: $gasireFacultateId) {
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
    }
  }
}`;

export const GASIRE_TOTAL_FACULTATI = gql`
query GasireTotalFacultati {
  gasireTotalFacultati {
    domeniu
    _id
  }
}`;