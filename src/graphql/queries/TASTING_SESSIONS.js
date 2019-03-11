import gql from "graphql-tag";
const TASTING_SESSIONS = gql`
  query tastingSessions {
    tastingSessions{
        id
        date
        wineTasters{
            id
        }
        wines{
            id
        }
    }
  }
`;

export default TASTING_SESSIONS;
