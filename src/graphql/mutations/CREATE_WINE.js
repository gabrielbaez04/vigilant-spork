import gql from "graphql-tag";
const CREATE_WINE = gql`
  mutation createWine(
    $name: String!
    $grapes: [WineGrapes!]
    $wineType: WineType
    $winery: String
    $year: Int
    $alcohol: Float
    $price: Float
    $sugarContent: String
    $bottleSize: String
  ) {
    createWine(
      data: {
        name: $name
        grapes: { set: $grapes }
        wineType: $wineType
        winery: $winery
        year: $year
        alcohol: $alcohol
        price: $price
        sugarContent: $sugarContent
        bottleSize: $bottleSize
      }
    ) {
      id
      name
      grapes
      wineType
      winery
      year
      alcohol
      price
      sugarContent
      bottleSize
    }
  }
`;

export default CREATE_WINE;
