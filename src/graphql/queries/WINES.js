import gql from "graphql-tag";
const WINES = gql`
  query Wines {
    wines {
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

export default WINES;
