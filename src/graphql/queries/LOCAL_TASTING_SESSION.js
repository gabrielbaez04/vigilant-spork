import gql from "graphql-tag";

const LOCAL_TASTING_SESSION = gql`
  query GetLocalState {
    sessionID @client
    sessionWines @client
    sessionWineTasters @client
    sessionReviews @client
  }
`;

export default LOCAL_TASTING_SESSION;
