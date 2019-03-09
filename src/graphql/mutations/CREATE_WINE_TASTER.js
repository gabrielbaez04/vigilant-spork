import gql from "graphql-tag";
const CREATE_WINE_TASTER = gql`
  mutation createWineTaster(
    $name: String!
    $nationality: String
    $gender: Gender
    $age: Int
    $favouriteWine: ID
  ) {
    createWineTaster(
      data: {
        name: $name
        nationality: $nationality
        gender: $gender
        age: $age
        favouriteWine: { connect: { id: $favouriteWine } }
      }
    ) {
      id
      name
      nationality
      gender
      age
      favouriteWine {
        id
        name
        grapes
        winery
        year
        alcohol
        price
      }
      reviews {
        id
      }
    }
  }
`;

export default CREATE_WINE_TASTER;
