import gql from "graphql-tag";
const CREATE_REVIEW = gql`
  mutation createReview(
    $wine: ID
    $wineTaster: ID!
    $tastingSession: ID!
    $score: Int
    $tastingNotes: [TastingNotes!]
  ) {
    createReview(
      data: {
        wine: { connect: { id: $wine } }
        wineTaster: { connect: { id: $wineTaster } }
        tastingSession: { connect: { id: $tastingSession } }
        score: $score
        tastingNotes: { set: $tastingNotes }
      }
    ) {
      id
    }
  }
`;

export default CREATE_REVIEW;
