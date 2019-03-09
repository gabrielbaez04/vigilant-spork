import gql from "graphql-tag";
const WINE_TASTERS = gql`
  query wineTasters {
    wineTasters {
      id
      name
      favouriteWine {
        name
        grapes
      }
    }
  }
`;

export default WINE_TASTERS;
