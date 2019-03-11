import gql from "graphql-tag";
const DELETE_TASTING_SESSION = gql`
  mutation deleteTastingSession(
    $sessionID: ID!
  ) {
    deleteTastingSession(
      where: { id: $sessionID }
    ){
      id
    }
    
  }
`;
export default DELETE_TASTING_SESSION;
