import gql from "graphql-tag";
const ADD_WINE = gql`
  mutation addWine(
    $id: ID
    $name: String
    $grapes: WineCreategrapesInput
    $winery: String
    $year: Int
    $alcohol: Float
    $price: Float
  ) {
    addWine(
      wine: {
        id: $id
        name: $name
        grapes: $grapes
        winery: $winery
        year: $year
        alcohol: $alcohol
        price: $price
      }
    ) @client
  }
`;

export default ADD_WINE;
