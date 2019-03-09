import gql from "graphql-tag";
const UPDATE_TASTING_SESSION = gql`
  mutation updateTastingSession(
    $sessionWineIDs: [WineWhereUniqueInput!]
    $sessionWineTastersIDs: [WineTasterWhereUniqueInput!]
    $sessionID: ID!
  ) {
    updateTastingSession(
      where: { id: $sessionID }
      data: {
        wines: { connect: $sessionWineIDs }
        wineTasters: { connect: $sessionWineTastersIDs }
      }
    ) {
      id
    }
  }
`;

export default UPDATE_TASTING_SESSION;
