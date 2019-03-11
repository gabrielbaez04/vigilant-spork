import gql from "graphql-tag";
const UPDATE_TASTING_SESSION = gql`
  mutation updateTastingSession(
    $sessionWineIDs: [WineWhereUniqueInput!]
    $sessionWineTastersIDs: [WineTasterWhereUniqueInput!]
    $sessionID: ID!
    $date: String
  ) {
    updateTastingSession(
      where: { id: $sessionID }
      data: {
        wines: { connect: $sessionWineIDs }
        wineTasters: { connect: $sessionWineTastersIDs }
        date: $date
      }
    ) {
      id
    }
  }
`;

export default UPDATE_TASTING_SESSION;
