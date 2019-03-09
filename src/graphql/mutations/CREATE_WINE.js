import gql from "graphql-tag";
const CREATE_WINE = gql`
  mutation createWine(
    $name: String!
    $grapes: [WineGrapes!]
    $winery: String
    $year: Int
    $alcohol: Float
    $price: Float
  ) {
    createWine(
      data: {
        name: $name
        grapes: { set: $grapes }
        winery: $winery
        year: $year
        alcohol: $alcohol
        price: $price
      }
    ) {
      id
      name
      grapes
      winery
      year
      alcohol
      price
    }
  }
`;

export default CREATE_WINE;
