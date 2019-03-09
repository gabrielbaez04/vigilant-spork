import gql from "graphql-tag";
const CREATE_TASTING_SESSION = gql`
  mutation {
    createTastingSession(data: {}) {
      id
    }
  }
`;

export default CREATE_TASTING_SESSION;
