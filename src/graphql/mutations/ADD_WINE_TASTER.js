import gql from "graphql-tag";
const ADD_WINE_TASTER = gql`
  mutation addWineTaster(
    $id: ID
    $name: String!
    $nationality: String
    $gender: Gender
    $age: Int
    $favouriteWine: ID
  ) {
    addWineTaster(
      wineTaster: {
        id: $id
        name: $name
        nationality: $nationality
        gender: $gender
        age: $age
        favouriteWine: $favouriteWine
      }
    ) @client
  }
`;

export default ADD_WINE_TASTER;
